var builder = DistributedApplication.CreateBuilder(args);

var secrets =
    builder.ExecutionContext.IsPublishMode
        ? builder.AddAzureKeyVault(name: "secrets")
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

var authService = builder
    .AddProject<Projects.Auth_Api>("authapi")
    .WithReference(secrets)
    .WithReference(authdb);

var goaldb = builder
    .AddPostgres(
        name: "goal",
        port: 5434,
        userName: username,
        password: pwd
    )
    .AddDatabase(name: "goaldb", databaseName: "100days_goal");

var goalService = builder
    .AddProject<Projects.Goal_Api>("goalapi")
    .WithReference(secrets)
    .WithReference(goaldb);

// apply migrations
builder.AddProject<Projects.Auth_MigrationService>("auth-migration").WithReference(authdb);
builder.AddProject<Projects.Goal_MigrationService>("goal-migration").WithReference(goaldb);

builder
    .AddNpmApp("react", "../100days.client", "dev")
    .WithReference(authService)
    .WithReference(goalService)
    .WithEnvironment("BROWSER", "none")
    .WithHttpEndpoint(env: "PORT")
    .WithExternalHttpEndpoints()
    .PublishAsDockerFile();

builder.Build().Run();