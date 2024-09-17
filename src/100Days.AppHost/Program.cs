var builder = DistributedApplication.CreateBuilder(args);

var api = builder.AddProject<Projects._100Days_Server>("api")
    .WithExternalHttpEndpoints();

builder.AddNpmApp("react", "../100days.client", "dev")
    .WithReference(api)
    .WithEnvironment("BROWSER", "none")
    .WithHttpEndpoint(env: "PORT")
    .WithExternalHttpEndpoints()
    .PublishAsDockerFile();

builder.Build().Run();