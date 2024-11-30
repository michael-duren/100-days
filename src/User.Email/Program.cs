using _100Days.RabbitConsumer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = Host.CreateApplicationBuilder(args);

builder.AddServiceDefaults();

builder.AddRabbitMQClient("messaging");
builder.Services.AddHostedService<RegisterProcessingJob>();

var host = builder.Build();
host.Run();