using _100Days.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace _100Days.Server.Context;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<Day> Days { get; set; } = null!;
}