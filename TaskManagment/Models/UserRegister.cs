using System.ComponentModel.DataAnnotations;

namespace TaskManagment.Models
{
    public class UserRegister
    {
        [Required]
        [StringLength(100)]
        public string Username { get; set; }

        [Required]
        [StringLength(100)]
        public string Email { get; set; }

        [Required]
        [StringLength(100)]
        public string Password { get; set; }

        [Required]
        [StringLength(100)]
        public string Position { get; set; }
    }
}
