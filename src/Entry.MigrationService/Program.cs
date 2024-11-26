using Entry.Data;
using Entry.MigrationService;

var builder = Host.CreateApplicationBuilder(args);

builder.AddServiceDefaults();

builder.Services.AddHostedService<Worker>();
builder.Services.AddOpenTelemetry();

builder.AddNpgsqlDbContext<EntryContext>("entrydb");

var host = builder.Build();
host.Run();