using System.Text;
using System.Text.Json;
using _100Days.Events;
using _100Days.Events.Users;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace _100Days.RabbitConsumer;

public class RegisterProcessingJob : BackgroundService
{
    private readonly ILogger<RegisterProcessingJob> _logger;
    private readonly IServiceProvider _serviceProvider;
    private IConnection? _messagingConnection;
    private IModel? _messageChannel;
    private EventingBasicConsumer? _consumer;

    public RegisterProcessingJob(
        ILogger<RegisterProcessingJob> logger,
        IServiceProvider serviceProvider
    )
    {
        _logger = logger;
        _serviceProvider = serviceProvider;
    }

    protected override Task ExecuteAsync(CancellationToken stoppingToken)
    {
        string queueName = "user-events";
        _messagingConnection = _serviceProvider.GetRequiredService<IConnection>();

        _messageChannel = _messagingConnection.CreateModel();
        _messageChannel.QueueDeclare(
            queue: queueName,
            durable: false,
            exclusive: false,
            autoDelete: false,
            arguments: null
        );
        _consumer = new EventingBasicConsumer(_messageChannel);
        _consumer.Received += ProcessMessageAsync;

        _messageChannel.BasicConsume(queue: queueName, autoAck: true, consumer: _consumer);

        return Task.CompletedTask;
    }

    public override async Task StopAsync(CancellationToken cancellationToken)
    {
        await base.StopAsync(cancellationToken);
        _consumer!.Received -= ProcessMessageAsync;
        _messageChannel?.Dispose();
    }

    private void ProcessMessageAsync(object? sender, BasicDeliverEventArgs e)
    {
        try
        {
            var body = Encoding.UTF8.GetString(e.Body.ToArray());
            MessageBody<UserSignedUpEvent>? messageBody =
                JsonSerializer.Deserialize<MessageBody<UserSignedUpEvent>>(body);
            if (messageBody is null)
            {
                _logger.LogWarning("Message body is null");
                return;
            }

            _logger.LogInformation("User signed up");
            _logger.LogInformation("Sending email beep boop");
        }
        catch (Exception exception)
        {
            _logger.LogError(exception, "Error processing message");
        }
    }
}