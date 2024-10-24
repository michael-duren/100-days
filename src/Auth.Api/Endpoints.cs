using Auth.Api.Models;
using Auth.Api.Services;
using Auth.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using LoginRequest = Auth.Api.Models.LoginRequest;

namespace Auth.Api;

public static class Endpoints
{
    public static void AddAuthEndpoints(this WebApplication app)
    {
        app.MapPost("/api/auth/login", LoginUserAsync)
            .Produces<UserDto>()
            .Produces(401)
            .Produces(404)
            .Produces(500)
            .Accepts<LoginRequest>("application/json");

        app.MapPost("/api/auth/register", RegisterUserAsync)
            .Produces<UserDto>()
            .Produces(400)
            .Produces(409)
            .Accepts<Microsoft.AspNetCore.Identity.Data.RegisterRequest>("application/json");

        app.MapPost("/api/auth/logout", LogoutUser)
            .RequireAuthorization();
    }

    private static IResult LogoutUser(
        HttpContext httpContext,
        IJwtCookieService jwtCookieService
    )
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
            return Results.NotFound();
        }

        bool result = await userManager.CheckPasswordAsync(user, request.Password);
        if (!result)
        {
            return Results.Unauthorized();
        }

        string token = await jwtTokenService.GenerateJwtTokenAsync(user);
        jwtCookieService.SetJwtCookie(httpContext, token);
        UserDto userDto = new()
        {
            UserId = user.Id,
            UserName = user.UserName,
            Email = user.Email
        };


        return Results.Ok(userDto);
    }

    internal static async Task<IResult> RegisterUserAsync(
        HttpContext httpContext,
        [FromBody] RegisterRequest request,
        [FromServices] UserManager<AppUser> userManager,
        [FromServices] IJwtTokenService jwtTokenService,
        [FromServices] IJwtCookieService jwtCookieService
    )
    {
        AppUser? existingUser = await userManager.FindByEmailAsync(request.Email);
        if (existingUser is not null)
        {
            return Results.Conflict("User already exists");
        }

        AppUser user = new()
        {
            Email = request.Email,
            UserName = request.UserName
        };
        IdentityResult result = await userManager.CreateAsync(user, request.Password);

        if (!result.Succeeded)
        {
            return Results.BadRequest(result.Errors.ToList().Select(x => x.Description));
        }

        string token = await jwtTokenService.GenerateJwtTokenAsync(user);
        jwtCookieService.SetJwtCookie(httpContext, token);

        var userDto = new UserDto
        {
            UserId = user.Id,
            UserName = user.UserName,
            Email = user.Email
        };

        return Results.Ok(userDto);
    }
}