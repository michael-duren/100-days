using System.Security.Claims;
using Goal.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Goal.Api;

public static class Endpoints
{
    public static void AddGoalEndpoints(this WebApplication app)
    {
        var goalEndpoints = app.MapGroup("/api/goals");

        goalEndpoints
            .MapGet("/all", GetAllGoals)
            .Produces<GoalDto[]>()
            .Produces(401)
            .RequireAuthorization();

        goalEndpoints
            .MapGet("/active", GetActiveGoal)
            .Produces<GoalDto>()
            .Produces(401)
            .RequireAuthorization();

        goalEndpoints
            .MapGet("/{id}", GetGoalById)
            .Produces<GoalDto>()
            .Produces(401)
            .RequireAuthorization();

        goalEndpoints
            .MapPost("/create", CreateGoal)
            .Produces<GoalDto>()
            .Produces(400)
            .Produces(401)
            .Accepts<GoalDto>("application/json")
            .RequireAuthorization();

        goalEndpoints
            .MapPut("/update/{id}", UpdateGoal)
            .Produces<GoalDto>()
            .Produces(400)
            .Produces(401)
            .Produces(404)
            .Accepts<GoalDto>("application/json")
            .RequireAuthorization();

        goalEndpoints
            .MapDelete("/delete/{id}", DeleteGoal)
            .Produces(200)
            .Produces(401)
            .Produces(404)
            .RequireAuthorization();
    }

    private static async Task<IResult> GetActiveGoal(
        HttpContext context,
        GoalContext dbContext,
        CancellationToken cancellationToken
    )
    {
        var userId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId is null)
        {
            return Results.Unauthorized();
        }

        var goal = await dbContext.Goals
            .Where(g => g.UserId == userId && !g.IsComplete)
            .Select(g => new GoalDto
            {
                GoalId = g.GoalId,
                Title = g.Title,
                Description = g.Description,
                Why = g.Why,
                IsComplete = g.IsComplete
            })
            .FirstOrDefaultAsync(cancellationToken);

        return Results.Ok(goal);
    }

    private static async Task<IResult> GetGoalById(
        HttpContext context,
        GoalContext dbContext,
        int id,
        CancellationToken cancellationToken
    )
    {
        var userId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId is null)
        {
            return Results.Unauthorized();
        }

        var goal = await dbContext.Goals
            .Where(g => g.UserId == userId && g.GoalId == id)
            .Select(g => new GoalDto
            {
                GoalId = g.GoalId,
                Title = g.Title,
                Description = g.Description,
                Why = g.Why,
                IsComplete = g.IsComplete
            })
            .FirstOrDefaultAsync(cancellationToken);

        return goal is not null
            ? Results.Ok(goal)
            : Results.NotFound();
    }

    private static async Task<IResult> DeleteGoal(
        HttpContext context,
        GoalContext dbContext,
        [FromQuery] int id,
        CancellationToken cancellationToken
    )
    {
        var userId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId is null)
        {
            return Results.Unauthorized();
        }

        var goal = await dbContext.Goals
            .Where(g => g.UserId == userId && g.GoalId == id)
            .FirstOrDefaultAsync(cancellationToken);
        if (goal is null)
        {
            return Results.NotFound();
        }

        dbContext.Remove(goal);
        var result = await dbContext.SaveChangesAsync(cancellationToken) > 0;
        return result
            ? Results.Ok()
            : Results.BadRequest("Failed to delete goal.");
    }

    private static async Task<IResult> UpdateGoal(
        HttpContext context,
        [FromBody] GoalDto goalDto,
        GoalContext dbContext,
        CancellationToken cancellationToken
    )
    {
        var userId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId is null)
        {
            return Results.Unauthorized();
        }

        var goal = await dbContext.Goals
            .Where(g => g.UserId == userId)
            .FirstOrDefaultAsync(cancellationToken);
        if (goal is null)
        {
            return Results.NotFound();
        }

        goal.Title = goalDto.Title;
        goal.Description = goalDto.Description;
        goal.Why = goalDto.Why;
        var result = await dbContext.SaveChangesAsync(cancellationToken) > 0;
        return result
            ? Results.Ok(goalDto)
            : Results.BadRequest("Failed to update goal.");
    }

    private static async Task<IResult> CreateGoal(
        HttpContext context,
        [FromBody] GoalDto goalDto,
        GoalContext dbContext,
        CancellationToken cancellationToken
    )
    {
        var userId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId is null)
        {
            return Results.Unauthorized();
        }

        var activeGoal = await dbContext
            .Goals
            .Where(g => !g.IsComplete && g.UserId == userId)
            .AnyAsync(cancellationToken);

        if (activeGoal)
        {
            return Results.BadRequest("User already has an active goal.");
        }

        var goal = new Data.Goal
        {
            UserId = userId,
            Title = goalDto.Title,
            Description = goalDto.Description,
            Why = goalDto.Why
        };
        var createdGoal = await dbContext.Goals.AddAsync(goal, cancellationToken);
        var result = await dbContext.SaveChangesAsync(cancellationToken) > 0;

        if (!result) return Results.BadRequest("Failed to create goal.");

        goalDto.GoalId = createdGoal.Entity.GoalId;
        return Results.Created($"/api/goal/{goal.GoalId}", goalDto);
    }

    private static async Task<IResult> GetAllGoals(
        HttpContext httpContext,
        GoalContext dbContext,
        ILogger<Data.Goal> logger,
        CancellationToken cancellationToken
    )
    {
        var userId = httpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId is null)
        {
            logger.LogWarning("Unauthorized request to retrieve goals.");
            return Results.Unauthorized();
        }

        var goals = await dbContext.Goals
            .Where(g => g.UserId == userId)
            .Select(g => new GoalDto
            {
                GoalId = g.GoalId,
                Title = g.Title,
                Description = g.Description,
                Why = g.Why,
                IsComplete = g.IsComplete
            })
            .ToArrayAsync(cancellationToken);
        logger.LogInformation("Retrieved {Count} goals for user {UserId}", goals.Length, userId);

        return Results.Ok(goals);
    }
}