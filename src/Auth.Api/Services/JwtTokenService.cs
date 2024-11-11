using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using Auth.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace Auth.Api.Services;

public interface IJwtTokenService
{
    string GenerateJwtTokenAsync(AppUser user);
}

public class JwtTokenService : IJwtTokenService
{
    private readonly UserManager<AppUser> _userManager;
    private readonly IConfiguration _configuration;
    private readonly ILogger<JwtTokenService> _logger;

    public JwtTokenService(
        UserManager<AppUser> userManager,
        IConfiguration configuration,
        ILogger<JwtTokenService> logger
    )
    {
        _userManager = userManager;
        _configuration = configuration;
        _logger = logger;
    }

    public string GenerateJwtTokenAsync(AppUser user)
    {
        string? privateKey = _configuration["private-key"];
        ArgumentException.ThrowIfNullOrEmpty(privateKey, nameof(privateKey));

        if (string.IsNullOrEmpty(privateKey))
        {
            throw new Exception("Private key is empty");
        }

        var rsa = RSA.Create();
        rsa.ImportFromPem(privateKey.ToCharArray());

        // Create credentials
        var credentials = new SigningCredentials(
            new RsaSecurityKey(rsa),
            SecurityAlgorithms.RsaSha256
        );

        // Create claims for JWT
        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user.Id),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new(ClaimTypes.Name, user.UserName ?? user.Email ?? ""),
        };

        // Generate JWT
        var tokenHandler = new JwtSecurityTokenHandler();
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(1),
            SigningCredentials = credentials,
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}