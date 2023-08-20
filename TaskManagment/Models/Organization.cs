using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TaskManagment.Models
{
    public class Organization
    {
        [Key]
        public int OrganizationId { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(250)")]
        public string OrganizationName { get; set; } = "";

        [ForeignKey("User")]
        public int CreatedBy { get; set; }

        public virtual User User { get; set; }
    }
}
