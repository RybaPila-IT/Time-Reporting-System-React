using Microsoft.EntityFrameworkCore;
using TimeReportingSystem.Models;

namespace TimeReportingSystem.DataAccess
{
    public class Context : DbContext
    {
        public DbSet<Month> Months { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<Acceptance> Acceptances { get; set; }
        
        public Context(DbContextOptions<Context> options) : base(options)
        {
        }
        
    }
}