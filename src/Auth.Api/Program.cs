using Auth.Api.Extensions;
using Auth.Data;
using Microsoft.AspNetCore.Identity;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthentication().AddCookie(IdentityConstants.ApplicationScheme);
builder.Services.AddAuthorization();

builder.Services.AddIdentityCore<AppUser>()
    .AddEntityFrameworkStores<AuthContext>()
    .AddApiEndpoints(); // add auth endpoints: login, register, etc.

// aspire db
builder.AddNpgsqlDbContext<AuthContext>("authdb");

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    // apply ef core migrations
    app.ApplyMigrations();
}

app.UseHttpsRedirection();

app.MapIdentityApi<AppUser>();

app.MapGet("/hello", () => new { message = "Hello Buddy" });

app.Run();