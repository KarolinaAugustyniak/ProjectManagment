using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManagment.Models
{
    public class Project
    {
        [Key]
        public int ProjectId { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(250)")]
        public string ProjectName { get; set; } = "";

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [ForeignKey("User")]
        public int CreatedBy { get; set; }

        [ForeignKey("Organization")]
        public int OrganizationId { get; set; }

        public virtual User User { get; set; }
        public virtual Organization Organization { get; set; }
        public virtual ICollection<TaskItem> Tasks { get; set; } = new List<TaskItem>();

    }
}
