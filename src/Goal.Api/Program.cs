using Goal.Api;
using Goal.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.AddServiceDefaults();

builder.AddAzureKeyVaultSecrets();
builder.AddJwtAuthentication();
builder.Services.AddAuthorization();

builder.AddNpgsqlDbContext<GoalContext>("goaldb");

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    using IServiceScope scope = app.Services.CreateScope();
    await using GoalContext context = scope.ServiceProvider.GetRequiredService<GoalContext>();
    await context.Database.MigrateAsync();
}

app.AddGoalEndpoints();

app.UseAuthentication();
app.Use(async (context, next) =>
{
    if (context.User?.Identity?.IsAuthenticated ?? false)
    {
        foreach (var claim in context.User.Claims)
        {
            Console.WriteLine($"{claim.Type}: {claim.Value}");
        }
        // Console.WriteLine($"User is authenticated: {context.User.Identity.Name}");
        // Console.WriteLine($"User id: {context.User.FindFirst("sub")?.Value}");
    }
    else
    {
        Console.WriteLine("User is not authenticated");
    }

    await next();
});
app.UseAuthorization();

app.UseHttpsRedirection();

app.Run();