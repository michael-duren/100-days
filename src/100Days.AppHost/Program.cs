var builder = DistributedApplication.CreateBuilder(args);

var secrets =
    builder.ExecutionContext.IsPublishMode
        ? builder.AddAzureKeyVault(name: "secrets")
        : builder.AddConnectionString("secrets");

var username = builder.AddParameter("username", secret: true);
var pwd = builder.AddParameter("password", secret: true);

var messaging = builder
    .AddRabbitMQ("messaging")
    .WithManagementPlugin();

builder.AddProject<Projects.User_Email>("consumers")
    .WithReference(messaging);

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
    .WithReference(messaging)
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
    .WithReference(messaging)
    .WithReference(secrets)
    .WithReference(goaldb);

var entrydb = builder
    .AddPostgres(
        name: "entry",
        port: 5435,
        userName: username,
        password: pwd
    )
    .AddDatabase(name: "entrydb", databaseName: "100days_entry");

var entryService = builder
    .AddProject<Projects.Entry_Api>("entryapi")
    .WithReference(messaging)
    .WithReference(secrets)
    .WithReference(entrydb);

// apply migrations
builder.AddProject<Projects.Auth_MigrationService>("auth-migration").WithReference(authdb);
builder.AddProject<Projects.Goal_MigrationService>("goal-migration").WithReference(goaldb);
builder.AddProject<Projects.Entry_MigrationService>("entry-migration").WithReference(entrydb);

builder
    .AddNpmApp("react", "../100days.client", "dev")
    .WithReference(authService)
    .WithReference(goalService)
    .WithReference(entryService)
    .WithEnvironment("BROWSER", "none")
    .WithHttpEndpoint(env: "PORT")
    .WithExternalHttpEndpoints()
    .PublishAsDockerFile();

builder.Build().Run();