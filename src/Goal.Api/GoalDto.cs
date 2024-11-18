namespace Goal.Api;

public class GoalDto
{
    /// <summary>
    /// The unique identifier for the goal.
    /// </summary>
    public int GoalId { get; set; }
    /// <summary>
    /// Goal Title
    /// </summary>
    public string Title { get; set; } = null!;

    /// <summary>
    /// Detailed description of the goal.
    /// </summary>
    public string Description { get; set; } = null!;

    /// <summary>
    /// Why this goal is important to the user.
    /// </summary>
    public string Why { get; set; } = null!;

    /// <summary>
    /// Whether the goal is complete.
    /// </summary>
    public bool IsComplete { get; set; }
}