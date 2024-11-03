namespace Goal.Data;

public class Goal
{
    public string UserId { get; set; } = null!;
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string Why { get; set; } = null!;
    public bool IsComplete { get; set; }
    public bool IsCurrent { get; set; }
}