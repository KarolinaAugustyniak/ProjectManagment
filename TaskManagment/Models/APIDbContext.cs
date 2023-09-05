using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;

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

        public DbSet<TaskComment> TaskComments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TaskItem>()
              .HasOne(t => t.Project)
              .WithMany(p => p.Tasks)
              .HasForeignKey(t => t.ProjectId)
              .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Organization>()
                 .HasMany(o => o.Projects)
                 .WithOne(p => p.Organization)
                 .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<TaskComment>()
              .HasOne(tc => tc.TaskItem)  
              .WithMany(ti => ti.TaskComments) 
              .HasForeignKey(tc => tc.TaskId);
        }
    }
}
