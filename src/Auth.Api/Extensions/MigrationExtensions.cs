using Auth.Data;
using Microsoft.EntityFrameworkCore;

namespace Auth.Api.Extensions;

public static class MigrationExtensions
{
    public static void ApplyMigrations(this IApplicationBuilder app)
    {
        using IServiceScope scope = app.ApplicationServices.CreateScope();

        using AuthContext context = scope.ServiceProvider.GetRequiredService<AuthContext>();

        context.Database.MigrateAsync();
    }
}