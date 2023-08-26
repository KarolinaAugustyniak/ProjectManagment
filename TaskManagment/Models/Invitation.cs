using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManagment.Models
{
    public class Invitation
    {
        [Key]
        public int InvitationId { get; set; }

        [Required]
        public string InvitationCode { get; set; }

        public DateTime Expire { get; set; }

        [Required]
        [ForeignKey("Organization")]
        public int OrganizationId { get; set; }  
    }
}
