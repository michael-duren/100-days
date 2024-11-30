using System.Security.Claims;
using System.Text;
using System.Text.Json;
using _100Days.Events;
using _100Days.Events.Users;
using Auth.Api.Models;
using Auth.Api.Services;
using Auth.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LoginRequest = Auth.Api.Models.LoginRequest;

namespace Auth.Api;

public static class Endpoints
{
    public static void AddAuthEndpoints(this WebApplication app)
    {
        var authEndoints = app.MapGroup("/api/auth");

        authEndoints
            .MapPost("/login", LoginUserAsync)
            .Produces<UserDto>()
            .Produces(401)
            .Produces(404)
            .Produces(500)
            .Accepts<LoginRequest>("application/json");

        authEndoints
            .MapPost("/register", RegisterUserAsync)
            .Produces<UserDto>()
            .Produces(400)
            .Produces(409)
            .Accepts<Microsoft.AspNetCore.Identity.Data.RegisterRequest>("application/json");

        authEndoints
            .MapPost("/logout", LogoutUser)
            .Produces(200)
            .Produces(401)
            .RequireAuthorization();

        authEndoints
            .MapGet("/me", GetCurrentUser)
            .Produces<UserDto>()
            .Produces(401)
            .RequireAuthorization();
    }

    private static IResult GetCurrentUser(
        HttpContext httpContext,
        [FromServices] AuthContext context,
        [FromServices] IJwtCookieService jwtCookieService
    )
    {
        if (httpContext.User.Identity is not { IsAuthenticated: true })
        {
            return Results.Unauthorized();
        }

        AppUser? user = context.Users
            .FirstOrDefaultAsync(u => u.Id == httpContext.User.FindFirstValue(ClaimTypes.NameIdentifier)).Result;

        if (user is null)
        {
            jwtCookieService.RemoveJwtCookie(httpContext);
            return Results.Unauthorized();
        }

        var userDto = new UserDto
        {
            UserId = user.Id,
            UserName = user.UserName,
            Email = user.Email
        };
        return Results.Ok(userDto);
    }

    private static IResult LogoutUser(HttpContext httpContext, IJwtCookieService jwtCookieService)
    {
        if (httpContext.User.Identity is not { IsAuthenticated: true })
        {
            return Results.Unauthorized();
        }

        jwtCookieService.RemoveJwtCookie(httpContext);
        return Results.Ok();
    }

    internal static async Task<IResult> LoginUserAsync(
        HttpContext httpContext,
        [FromBody] LoginRequest request,
        [FromServices] UserManager<AppUser> userManager,
        [FromServices] IJwtTokenService jwtTokenService,
        [FromServices] IJwtCookieService jwtCookieService
    )
    {
        AppUser? user = await userManager.FindByEmailAsync(request.Email);
        if (user is null)
        {
            return Results.Json(new { message = "User not found" }, statusCode: 404);
        }

        bool result = await userManager.CheckPasswordAsync(user, request.Password);
        if (!result)
        {
            return Results.Json(new { message = "Invalid password" }, statusCode: 401);
        }

        string token = jwtTokenService.GenerateJwtTokenAsync(user);
        jwtCookieService.SetJwtCookie(httpContext, token);
        UserDto userDto =
            new()
            {
                UserId = user.Id,
                UserName = user.UserName,
                Email = user.Email,
            };

        return Results.Ok(userDto);
    }

    internal static async Task<IResult> RegisterUserAsync(
        HttpContext httpContext,
        [FromBody] RegisterRequest request,
        [FromServices] UserManager<AppUser> userManager,
        [FromServices] IJwtTokenService jwtTokenService,
        [FromServices] IJwtCookieService jwtCookieService,
        [FromServices] RabbitMQ.Client.IConnection connection
    )
    {
        AppUser? existingUser = await userManager.FindByEmailAsync(request.Email);
        if (existingUser is not null)
        {
            return Results.Conflict("User already exists");
        }

        AppUser user = new() { Email = request.Email, UserName = request.UserName };
        IdentityResult result = await userManager.CreateAsync(user, request.Password);

        if (!result.Succeeded)
        {
            return Results.BadRequest(result.Errors.ToList().Select(x => x.Description));
        }

        var channel = connection.CreateModel();

        // declare a queue
        channel.QueueDeclare(
            queue: QueueNames.UserEvents,
            durable: false, // if true, the queue will survive broker restarts
            exclusive: false, // if true, connection is exclusive to the queue
            autoDelete: false, // if true, the queue will be deleted when the number of consumers drops to zero
            arguments: null
        );
        var body = new MessageBody<UserSignedUpEvent>
        {
            EventType = EventTypes.UserRegistered,
            Data = new UserSignedUpEvent
            {
                Email = user.Email
            },
            DateTime = DateTime.UtcNow
        };
        var encodedBody = JsonSerializer.SerializeToUtf8Bytes(body);
        channel.BasicPublish(
            exchange: ExchangeNames.DefaultExchange,
            mandatory: false,
            routingKey: QueueNames.UserEvents,
            basicProperties: null,
            body: encodedBody
        );

        string token = jwtTokenService.GenerateJwtTokenAsync(user);
        jwtCookieService.SetJwtCookie(httpContext, token);

        var userDto = new UserDto
        {
            UserId = user.Id,
            UserName = user.UserName,
            Email = user.Email,
        };

        return Results.Ok(userDto);
    }
}