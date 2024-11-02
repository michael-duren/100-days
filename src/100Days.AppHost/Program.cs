var builder = DistributedApplication.CreateBuilder(args);

var postgres = builder.AddPostgres("postgres");
var postgresdb = postgres.AddDatabase("postgresdb", "100days");

var username = builder.AddParameter("username", secret: true);
var pwd = builder.AddParameter("password", secret: true);

var authdb = builder
    .AddPostgres("auth", port: 5433, userName: username, password: pwd)
    .AddDatabase("authdb", "100days_auth");

var authService = builder.AddProject<Projects.Auth_Api>("authapi").WithReference(authdb);

builder.AddProject<Projects.Auth_MigrationService>("auth-migration").WithReference(authdb);

var api = builder
    .AddProject<Projects._100Days_Server>("api")
    .WithReference(postgresdb)
    .WithExternalHttpEndpoints();

builder
    .AddNpmApp("react", "../100days.client", "dev")
    .WithReference(api)
    .WithReference(authService)
    .WithEnvironment("BROWSER", "none")
    .WithHttpEndpoint(env: "PORT")
    .WithExternalHttpEndpoints()
    .PublishAsDockerFile();

builder.Build().Run();