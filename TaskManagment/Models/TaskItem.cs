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

        public DateTime? DueDate { get; set; }

        public DateTime CreationDate { get; set; } = DateTime.UtcNow;

        [Required]
        [ForeignKey("Project")]
        public int ProjectId { get; set; }

        [ForeignKey("CreatedByUser")]
        public int Created_By { get; set; }

        [ForeignKey("AssignedToUser")]
        public int? AssignedTo { get; set; }

        public virtual Project Project { get; set; }
        public virtual User CreatedByUser { get; set; }
        public virtual User AssignedToUser { get; set; }

    }

    public enum TaskStatus
    {
        ToDo,
        InProgress,
        Testing,
        Completed
    }
}
