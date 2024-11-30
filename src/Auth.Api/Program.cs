using Auth.Api;
using Auth.Api.Extensions;
using Auth.Api.Services;
using Auth.Data;
using Microsoft.AspNetCore.Identity;

var builder = WebApplication.CreateBuilder(args);
builder.AddRabbitMQClient("messaging");

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.AddServiceDefaults();

builder.AddAzureKeyVaultSecrets();
builder.AddJwtAuthentication();
builder.Services.AddAuthorization();

builder.Services.AddScoped<IJwtTokenService, JwtTokenService>();
builder.Services.AddScoped<IJwtCookieService, JwtCookieService>();

builder.Services.AddIdentityCore<AppUser>().AddEntityFrameworkStores<AuthContext>();

builder.Services.Configure<IdentityOptions>(opts =>
{
    opts.Password.RequireDigit = true;
    opts.Password.RequireLowercase = true;
    opts.Password.RequireNonAlphanumeric = true;
    opts.Password.RequireUppercase = true;
    opts.Password.RequiredLength = 6;
    opts.Password.RequiredUniqueChars = 1;
});

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

app.AddAuthEndpoints();

app.UseAuthentication();
app.UseAuthorization();

app.Run();