using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManagment.Models
{
    public class TaskItem
    {
        [Key]
        public int TaskId { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(250)")]
        public string Title { get; set; }

        public string? Description { get; set; }

        [Required]
        public TaskStatus Status { get; set; } = TaskStatus.ToDo;

        public DateTime DueDate { get; set; }

        public DateTime CreationDate { get; set; } = DateTime.UtcNow;
    }

    public enum TaskStatus
    {
        ToDo,
        InProgress,
        Testing,
        Completed
    }
}
