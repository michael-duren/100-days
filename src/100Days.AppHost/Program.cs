var builder = DistributedApplication.CreateBuilder(args);

var postgres = builder.AddPostgres("postgres");

// takes the name of the resource this will be used for connection strings and connecting
// this component to others, and an optional name for the database, defaults to the resource name
// if none is specified
var postgresdb = postgres.AddDatabase("postgresdb", "100days");

var authdb = builder
    .AddPostgres("auth")
    .AddDatabase("authdb", "100days_auth");

var authService = builder.AddProject<Projects.Auth_Api>("auth-api")
    .WithReference(authdb);

var api = builder.AddProject<Projects._100Days_Server>("api")
    .WithReference(postgresdb)
    .WithExternalHttpEndpoints();

builder.AddNpmApp("react", "../100days.client", "dev")
    .WithReference(api)
    .WithEnvironment("BROWSER", "none")
    .WithHttpEndpoint(env: "PORT")
    .WithExternalHttpEndpoints()
    .PublishAsDockerFile();

builder.Build().Run();