namespace _100Days.Server.Models;

public class Day
{
    public int DayId { get; set; }
    public string? Goal { get; set; }
    public int MinutesElapsed { get; set; }
    public string? Notes { get; set; }
    public DateTime Date { get; set; }
}

