using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TaskManagment.Models;
using TaskManagment.Services;

namespace TaskManagment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskCommentsController : ControllerBase
    {
        private readonly APIDbContext _context;
        private readonly UserService _userService;

        public TaskCommentsController(APIDbContext context, UserService userService)
        {
            _context = context;
            _userService = userService;
        }

        [HttpPost]
        public async Task<ActionResult<TaskComment>> PostTaskComment(TaskCommentDto taskComment)
        {
            var loggedInUserId = int.Parse( User.FindFirstValue(ClaimTypes.NameIdentifier) );

            var newTaskComment = new TaskComment
            {
                TaskId = taskComment.TaskId,
                CommentText = taskComment.CommentText,
                CommentedByUserID = loggedInUserId,
                CommentDate = DateTime.UtcNow
              
            };

            _context.TaskComments.Add(newTaskComment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTaskComment", new { id = newTaskComment.CommentId }, newTaskComment);
        }

        [HttpGet("GetCommentsForTask/{taskId}")]
        public async Task<ActionResult<IEnumerable<TaskComment>>> GetCommentsForTask(int taskId)
        {
            var taskComments = await _context.TaskComments
                .Where(tc => tc.TaskId == taskId)
                .Include(u => u.CommentedByUser)
                .ToListAsync();

            return Ok(taskComments);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutTaskComment(int id,[FromBody] string newCommentText)
        {
            var taskComment = await _context.TaskComments.FindAsync(id);
            if (taskComment == null)
            {
                return NotFound();
            }

            taskComment.CommentText = newCommentText;

            try
            {
                await _context.SaveChangesAsync();
                return Ok(taskComment);
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<TaskComment>> DeleteTaskComment(int id)
        {
            var taskComment = await _context.TaskComments.FindAsync(id);
            if (taskComment == null)
            {
                return NotFound();
            }

            _context.TaskComments.Remove(taskComment);
            await _context.SaveChangesAsync();

            return Ok(taskComment);
        }

    }
}
