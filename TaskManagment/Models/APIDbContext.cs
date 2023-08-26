using Microsoft.EntityFrameworkCore;

namespace TaskManagment.Models
{
    public class APIDbContext:DbContext
    {
        public APIDbContext(DbContextOptions option):base(option)
        { 
        }

        public DbSet<TaskItem> TaskItems { get; set; }
      
        public DbSet<User> Users { get; set; }

        public DbSet<Organization> Organizations { get; set; }

        public DbSet<Project> Projects { get; set; }

        public DbSet<Invitation> Invitations { get; set; }

    }
}
