namespace _100Days.Events;

public class MessageBody<T>
{
    public string EventType { get; set; } = null!;
    public T Data { get; set; } = default!;
    public DateTime DateTime { get; set; }
}