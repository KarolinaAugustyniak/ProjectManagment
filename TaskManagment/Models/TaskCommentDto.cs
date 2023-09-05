using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManagment.Models
{
    public class TaskCommentDto
    {
        public int TaskId { get; set; }

        public string CommentText { get; set; }
    }
}
