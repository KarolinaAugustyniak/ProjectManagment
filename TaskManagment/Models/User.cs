using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManagment.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string Username { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string Email { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string PasswordHash { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string Position { get; set; }

        [ForeignKey("Organization")]
        public int OrganizationId { get; set; }

        public User(string username, string email, string passwordHash, string position)
        {
            Username = username;
            Email = email;
            PasswordHash = passwordHash;
            Position = position;
        }

    }

}
