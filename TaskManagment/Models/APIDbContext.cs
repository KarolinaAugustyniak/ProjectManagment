using Microsoft.EntityFrameworkCore;

namespace TaskManagment.Models
{
    public class APIDbContext:DbContext
    {
        public APIDbContext(DbContextOptions option):base(option)
        { 
        }

        public DbSet<TaskItem> TaskItems { get; set; }
    }
}
