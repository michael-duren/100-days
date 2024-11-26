using Goal.Data;
using Goal.MigrationService;

var builder = Host.CreateApplicationBuilder(args);

builder.AddServiceDefaults();

builder.Services.AddHostedService<Worker>();
builder.Services.AddOpenTelemetry();

builder.AddNpgsqlDbContext<GoalContext>("goaldb");

var host = builder.Build();
host.Run();