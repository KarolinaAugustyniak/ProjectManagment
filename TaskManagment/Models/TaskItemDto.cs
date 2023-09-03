using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManagment.Models
{
    public class TaskItemDto
    {
        public string Title { get; set; }

        public TaskStatus Status { get; set; }

        public int ProjectId { get; set; }
    }
}
