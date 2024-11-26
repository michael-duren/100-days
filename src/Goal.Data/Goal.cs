using System.ComponentModel.DataAnnotations;

namespace Goal.Data;

public class Goal
{
    /// <summary>
    /// The unique identifier for the goal.
    /// </summary>
    public int GoalId { get; set; }

    /// <summary>
    /// The Application User ID of the user who created the goal.
    /// </summary>
    [MaxLength(256)]
    public string UserId { get; set; } = null!;

    /// <summary>
    /// Goal Title
    /// </summary>
    [MaxLength(100)]
    public string Title { get; set; } = null!;

    /// <summary>
    /// Detailed description of the goal.
    /// </summary>
    [MaxLength(1024)]
    public string Description { get; set; } = null!;

    /// <summary>
    /// Why this goal is important to the user.
    /// </summary>
    [MaxLength(1024)]
    public string Why { get; set; } = null!;

    /// <summary>
    /// Whether the goal is complete.
    /// </summary>
    public bool IsComplete { get; set; }

    /// <summary>
    /// The date and time the goal was created.
    /// </summary>
    public DateTime Created { get; set; }
}