using System.Security.Cryptography;
using Auth.Api;
using Auth.Api.Extensions;
using Auth.Api.Services;
using Auth.Data;
using Azure.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.AddServiceDefaults();

builder.AddAzureKeyVaultSecrets();

string? publicKey = builder.Configuration["public-key"];

ArgumentException.ThrowIfNullOrEmpty(publicKey, nameof(publicKey));

using var rsa = RSA.Create();

rsa.ImportFromPem(publicKey.ToCharArray());

builder
    .Services.AddAuthentication(opts =>
    {
        opts.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        opts.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(opts =>
    {
        opts.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                var token = context.Request.Cookies["jwt"];
                if (!string.IsNullOrEmpty(token))
                {
                    context.Token = token;
                }

                return Task.CompletedTask;
            },
        };
        opts.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new RsaSecurityKey(rsa),
        };
    });
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

// app.MapIdentityApi<AppUser>();
app.AddAuthEndpoints();
app.MapGet("/api/test", () => "SECURED!").RequireAuthorization();

app.UseAuthentication();
app.UseAuthorization();

app.Run();