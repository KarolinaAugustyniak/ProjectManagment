using System.ComponentModel.DataAnnotations;

namespace TaskManagment.Models
{
    public class UserLogin
    {
        [Required]
        [StringLength(100)]
        public string Username { get; set; }

        [Required]
        [StringLength(100)]
        public string PasswordHash { get; set; }
    }
}
