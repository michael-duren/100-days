using Microsoft.EntityFrameworkCore;

namespace Entry.Data;

public class EntryContext : DbContext
{
    public EntryContext(DbContextOptions<EntryContext> options) : base(options)
    {
    }

    public DbSet<Entry> Entries { get; set; } = null!;
}