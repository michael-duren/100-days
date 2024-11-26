namespace Entry.Api;

public class EntryDto
{
    /// <summary>
    /// Unique identifier for the entry.
    /// </summary>
    public int EntryId { get; set; }

    /// <summary>
    /// Title of what the user did.
    /// </summary>
    public string Title { get; set; } = null!;

    /// <summary>
    /// Description of what the user did.
    /// </summary>
    public string Description { get; set; } = null!;

    /// <summary>
    /// The date and time the entry was created.
    /// </summary>
    public DateTime Created { get; set; }

    /// <summary>
    /// The unique identifier of the goal this entry is associated with.
    /// </summary>
    public int GoalId { get; set; }
}