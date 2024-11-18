using Microsoft.EntityFrameworkCore;

namespace Goal.Data;

public class GoalContext : DbContext
{
    public GoalContext(DbContextOptions<GoalContext> options) : base(options)
    {
    }

    public DbSet<Goal> Goals { get; set; }
}