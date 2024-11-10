var builder = DistributedApplication.CreateBuilder(args);

var secrets =
    builder.ExecutionContext.IsPublishMode
        ? builder.AddAzureKeyVault("secrets")
        : builder.AddConnectionString("secrets");

var username = builder.AddParameter("username", secret: true);
var pwd = builder.AddParameter("password", secret: true);

var authdb = builder
    .AddPostgres(
        name: "auth",
        port: 5433,
        userName: username,
        password: pwd
    )
    .AddDatabase(name: "authdb", databaseName: "100days_auth");

var authService = builder.AddProject<Projects.Auth_Api>("authapi").WithReference(authdb);

builder.AddProject<Projects.Auth_MigrationService>("auth-migration").WithReference(authdb);

builder
    .AddNpmApp("react", "../100days.client", "dev")
    .WithReference(authService)
    .WithEnvironment("BROWSER", "none")
    .WithHttpEndpoint(env: "PORT")
    .WithExternalHttpEndpoints()
    .PublishAsDockerFile();

builder.Build().Run();