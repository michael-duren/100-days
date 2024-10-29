using Auth.Data;
using Auth.MigrationService;

var builder = Host.CreateApplicationBuilder(args);

builder.AddServiceDefaults();

builder.Services.AddHostedService<Worker>();
builder.Services.AddOpenTelemetry();
// .WithTracing(tracing => tracing.AddSource(Worker.ActivitySourceName));

builder.AddNpgsqlDbContext<AuthContext>("authdb");

builder.Services.AddIdentityCore<AppUser>()
    .AddEntityFrameworkStores<AuthContext>();

var host = builder.Build();
host.Run();