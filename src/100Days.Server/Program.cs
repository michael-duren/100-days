using _100Days.Server.Context;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// builder.AddServiceDefaults();

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// use same name as specified in apphost
// there is no need to manage appsettings files with this
builder.AddNpgsqlDbContext<ApplicationDbContext>("postgresdb");

// setup postgres connection

var app = builder.Build();

// app.MapDefaultEndpoints();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    using (var scope = app.Services.CreateScope())
    {
        // ensure the database is created. ONLY for development
        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        context.Database.EnsureCreated();
    }
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapGet("/hello", () => "Hello World!");
app.MapGet("/day",
    async (ApplicationDbContext context, CancellationToken cancellationToken) =>
        await context.Days.ToListAsync(cancellationToken));

app.Run();