using System.Diagnostics;
using Auth.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;
using OpenTelemetry.Trace;

namespace Auth.MigrationService;

public class Worker(IServiceProvider serviceProvider, IHostApplicationLifetime hostApplicationLifetime)
    : BackgroundService
{
    private const string ActivitySourceName = "Migrations";
    private static readonly ActivitySource s_activitySource = new(ActivitySourceName);

    protected override async Task ExecuteAsync(CancellationToken cancellationToken)
    {
        using var activity = s_activitySource.StartActivity("Migrating database", ActivityKind.Client);

        try
        {
            using var scope = serviceProvider.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<AuthContext>();

            await EnsureDatabaseAsync(dbContext, cancellationToken);
            await RunMigrationAsync(dbContext, cancellationToken);
            // await SeedDataAsync(dbContext, cancellationToken);
        }
        catch (Exception ex)
        {
            activity?.RecordException(ex);
            throw;
        }

        hostApplicationLifetime.StopApplication();
    }

    private static async Task EnsureDatabaseAsync(AuthContext dbContext, CancellationToken cancellationToken)
    {
        var dbCreator = dbContext.GetService<IRelationalDatabaseCreator>();

        var strategy = dbContext.Database.CreateExecutionStrategy();
        await strategy.ExecuteAsync(async () =>
        {
            // Create the database if it does not exist.
            // Do this first so there is then a database to start a transaction against.
            if (!await dbCreator.ExistsAsync(cancellationToken))
            {
                await dbCreator.CreateAsync(cancellationToken);
            }
        });
    }

    private static async Task RunMigrationAsync(AuthContext dbContext, CancellationToken cancellationToken)
    {
        var strategy = dbContext.Database.CreateExecutionStrategy();
        await strategy.ExecuteAsync(async () =>
        {
            // Run migration in a transaction to avoid partial migration if it fails.
            await using var transaction = await dbContext.Database.BeginTransactionAsync(cancellationToken);
            await dbContext.Database.MigrateAsync(cancellationToken);
            await transaction.CommitAsync(cancellationToken);
        });
    }

    // private static async Task SeedDataAsync(AuthContext dbContext, CancellationToken cancellationToken)
    // {
    //     var passwordHasher = new PasswordHasher<AppUser>();
    //     var passwordHash = passwordHasher.HashPassword(null, "Pa$$w0rd!");
    //     AppUser user = new()
    //     {
    //         UserName = "MichaelDuren",
    //         Email = "michael@michael.com",
    //         EmailConfirmed = true,
    //         PasswordHash = passwordHash,
    //     };
    //
    //     var strategy = dbContext.Database.CreateExecutionStrategy();
    //     await strategy.ExecuteAsync(async () =>
    //     {
    //         // Seed the database
    //         await using var transaction = await dbContext.Database.BeginTransactionAsync(cancellationToken);
    //         await dbContext.Users.AddAsync(user, cancellationToken);
    //         await dbContext.SaveChangesAsync(cancellationToken);
    //         await transaction.CommitAsync(cancellationToken);
    //     });
    // }
}