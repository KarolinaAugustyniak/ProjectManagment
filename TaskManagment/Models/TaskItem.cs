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

        [Column(TypeName = "nvarchar(1000)")]
        public string? Description { get; set; }

        [Required]
        public TaskStatus Status { get; set; } = TaskStatus.ToDo;

        public DateTime DueDate { get; set; }

        public DateTime CreationDate { get; set; } = DateTime.UtcNow;

        [ForeignKey("User")]
        public int Created_By { get; set; }

        [ForeignKey("User")]
        public int AssignedTo { get; set; }
    }

    public enum TaskStatus
    {
        ToDo,
        InProgress,
        Testing,
        Completed
    }
}
