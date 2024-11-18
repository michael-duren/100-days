using System.Security.Cryptography;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Microsoft.Extensions.Hosting;

public class RsaKeyService
{
    public RsaSecurityKey SecurityKey { get; set; }

    public RsaKeyService(IConfiguration configuration)
    {
        string? publicKey = configuration["public-key"];
        ArgumentException.ThrowIfNullOrEmpty(publicKey);

        var rsa = RSA.Create();
        rsa.ImportFromPem(publicKey.ToCharArray());
        SecurityKey = new RsaSecurityKey(rsa);
    }
}

public static class AuthenticationExtensions
{
    public static void AddJwtAuthentication(this WebApplicationBuilder builder)
    {
        builder.Services.AddSingleton<RsaKeyService>();
        string? publicKey = builder.Configuration["public-key"];
        ArgumentException.ThrowIfNullOrEmpty(publicKey);

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
                            Console.WriteLine($"Token found in cookie \n\n{token}");
                            context.Token = token;
                        }
                        else
                        {
                            Console.WriteLine("No token found in cookie");
                        }

                        return Task.CompletedTask;
                    },
                    OnAuthenticationFailed = context =>
                    {
                        Console.WriteLine($"Authentication failed: {context.Exception.Message}");
                        return Task.CompletedTask;
                    },
                    OnChallenge = context =>
                    {
                        Console.WriteLine($"Authentication challenge: {context.Error}");
                        return Task.CompletedTask;
                    }
                };
                var rsaKeyService = builder.Services.BuildServiceProvider().GetRequiredService<RsaKeyService>();

                opts.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = rsaKeyService.SecurityKey,
                    ClockSkew = TimeSpan.Zero
                };
            });
    }
}