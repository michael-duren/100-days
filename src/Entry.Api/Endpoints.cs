using System.Security.Claims;
using Entry.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Entry.Api;

public static class Endpoints
{
    public static void AddEntryEndpoints(this WebApplication app)
    {
        var entryEndpoints = app.MapGroup("/api/entrys");

        entryEndpoints
            .MapGet("/all", GetAllEntries)
            .Produces<EntryDto[]>()
            .Produces(401)
            .RequireAuthorization();

        entryEndpoints
            .MapGet("/{id}", GetEntryById)
            .Produces<EntryDto>()
            .Produces(401)
            .RequireAuthorization();

        entryEndpoints
            .MapPost("/create", CreateEntry)
            .Produces<EntryDto>()
            .Produces(400)
            .Produces(401)
            .Accepts<EntryDto>("application/json")
            .RequireAuthorization();

        entryEndpoints
            .MapPut("/update/{id}", UpdateEntry)
            .Produces<EntryDto>()
            .Produces(400)
            .Produces(401)
            .Produces(404)
            .Accepts<EntryDto>("application/json")
            .RequireAuthorization();

        entryEndpoints
            .MapDelete("/delete/{id}", DeleteEntry)
            .Produces(200)
            .Produces(401)
            .Produces(404)
            .RequireAuthorization();
    }

    private static async Task<IResult> GetEntryById(
        HttpContext context,
        EntryContext dbContext,
        int id,
        CancellationToken cancellationToken
    )
    {
        var userId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId is null)
        {
            return Results.Unauthorized();
        }

        var entry = await dbContext.Entries
            .Where(g => g.UserId == userId && g.EntryId == id)
            .Select(g => new EntryDto
            {
                EntryId = g.EntryId,
                Title = g.Title,
                Description = g.Description,
                Created = g.Created,
                GoalId = g.GoalId,
            })
            .FirstOrDefaultAsync(cancellationToken);

        return entry is not null
            ? Results.Ok(entry)
            : Results.NotFound();
    }

    private static async Task<IResult> DeleteEntry(
        HttpContext context,
        EntryContext dbContext,
        [FromQuery] int id,
        CancellationToken cancellationToken
    )
    {
        var userId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId is null)
        {
            return Results.Unauthorized();
        }

        var entry = await dbContext.Entries
            .Where(g => g.UserId == userId && g.EntryId == id)
            .FirstOrDefaultAsync(cancellationToken);
        if (entry is null)
        {
            return Results.NotFound();
        }

        dbContext.Remove(entry);
        var result = await dbContext.SaveChangesAsync(cancellationToken) > 0;
        return result
            ? Results.Ok()
            : Results.BadRequest("Failed to delete entry.");
    }

    private static async Task<IResult> UpdateEntry(
        HttpContext context,
        [FromBody] EntryDto entryDto,
        EntryContext dbContext,
        CancellationToken cancellationToken
    )
    {
        var userId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId is null)
        {
            return Results.Unauthorized();
        }

        var entry = await dbContext.Entries
            .Where(g => g.UserId == userId)
            .FirstOrDefaultAsync(cancellationToken);
        if (entry is null)
        {
            return Results.NotFound();
        }

        entry.Title = entryDto.Title;
        entry.Description = entryDto.Description;
        var result = await dbContext.SaveChangesAsync(cancellationToken) > 0;
        return result
            ? Results.Ok(entryDto)
            : Results.BadRequest("Failed to update entry.");
    }

    private static async Task<IResult> CreateEntry(
        HttpContext context,
        [FromBody] EntryDto entryDto,
        EntryContext dbContext,
        CancellationToken cancellationToken
    )
    {
        var userId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId is null)
        {
            return Results.Unauthorized();
        }

        var activeEntry = await dbContext
            .Entries
            .Where(c => c.Created.Date == DateTime.Today && c.UserId == userId)
            .AnyAsync(cancellationToken);

        if (activeEntry)
        {
            return Results.BadRequest("User already has an active entry for today.");
        }

        var entry = new Data.Entry
        {
            UserId = userId,
            GoalId = entryDto.GoalId,
            Title = entryDto.Title,
            Description = entryDto.Description,
            Created = DateTime.Now,

        };
        var createdEntry = await dbContext.Entries.AddAsync(entry, cancellationToken);
        var result = await dbContext.SaveChangesAsync(cancellationToken) > 0;

        if (!result) return Results.BadRequest("Failed to create entry.");

        entryDto.EntryId = createdEntry.Entity.EntryId;
        return Results.Created($"/api/entry/{entry.EntryId}", entryDto);
    }

    private static async Task<IResult> GetAllEntries(
        HttpContext httpContext,
        EntryContext dbContext,
        ILogger<Data.Entry> logger,
        CancellationToken cancellationToken
    )
    {
        var userId = httpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId is null)
        {
            logger.LogWarning("Unauthorized request to retrieve entries.");
            return Results.Unauthorized();
        }

        var entrys = await dbContext.Entries
            .Where(g => g.UserId == userId)
            .Select(g => new EntryDto
            {
                EntryId = g.EntryId,
                Title = g.Title,
                Description = g.Description,
                Created = g.Created,
                GoalId = g.GoalId,

            })
            .ToArrayAsync(cancellationToken);
        logger.LogInformation("Retrieved {Count} entrys for user {UserId}", entrys.Length, userId);

        return Results.Ok(entrys);
    }
}