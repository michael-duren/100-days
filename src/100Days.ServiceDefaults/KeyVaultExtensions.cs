using Azure.Identity;
using Microsoft.Extensions.Configuration;

namespace Microsoft.Extensions.Hosting;

public static class KeyVaultExtensions
{
    /// <summary>
    /// Configure Azure Key Vault secrets for the application.
    /// The key vault URL is retrieved from the connection string named "secrets".
    /// This must be configured in the AppHost Project.
    /// </summary>
    /// <param name="builder">The WebApplication Builder</param>
    public static void AddAzureKeyVaultSecrets(this IHostApplicationBuilder builder)
    {
        if (builder.Environment.IsDevelopment())
        {
            var keyVaultUrl = builder.Configuration.GetConnectionString("secrets");
            ArgumentException.ThrowIfNullOrEmpty(keyVaultUrl, nameof(keyVaultUrl));
            builder.Configuration.AddAzureKeyVault(
                new Uri(keyVaultUrl),
                // using the default azure credential provider will use the az cli
                new DefaultAzureCredential()
            );
        }
        else
        {
            // Add Azure Key Vault secret values to app configuration (must be the same name you gave the resource in the apphost)
            builder.Configuration.AddAzureKeyVaultSecrets("secrets");
        }
    }
}