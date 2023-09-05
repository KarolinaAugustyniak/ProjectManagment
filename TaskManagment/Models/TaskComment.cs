using Microsoft.CodeAnalysis.Differencing;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManagment.Models
{
    public class TaskComment
    {
        [Key]
        public int CommentId { get; set; }

        [Required]
        public int TaskId { get; set; }

        [Required]
        public string CommentText { get; set; }

        [Required]
        [ForeignKey("User")]
        public int CommentedByUserID { get; set; }

        [Required]
        public DateTime CommentDate { get; set; }

        [ForeignKey("CommentedByUserID")]
        public virtual User CommentedByUser { get; set; }

        public virtual TaskItem TaskItem { get; set; } 

    }
}
