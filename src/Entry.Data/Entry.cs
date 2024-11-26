using System.ComponentModel.DataAnnotations;

namespace Entry.Data;

public class Entry
{
    /// <summary>
    /// Unique identifier for the entry.
    /// </summary>
    public int EntryId { get; set; }

    /// <summary>
    /// Title of what the user did.
    /// </summary>
    [MaxLength(100)]
    public string Title { get; set; } = null!;

    /// <summary>
    /// Description of what the user did.
    /// </summary>
    [MaxLength(1024)]
    public string Description { get; set; } = null!;

    /// <summary>
    /// The date and time the entry was created.
    /// </summary>
    public DateTime Created { get; set; }

    /// <summary>
    /// The Application User ID of the user who created the entry.
    /// </summary>
    [MaxLength(256)]
    public string UserId { get; set; } = null!;
    
    /// <summary>
    /// The unique identifier of the goal this entry is associated with.
    /// </summary>
    public int GoalId { get; set; }
}