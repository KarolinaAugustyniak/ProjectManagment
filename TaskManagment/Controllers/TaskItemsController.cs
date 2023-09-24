using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManagment.Models;
using TaskManagment.Services;

namespace TaskManagment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TaskItemsController : ControllerBase
    {
        private readonly APIDbContext _context;
        private readonly UserService _userService;

        public TaskItemsController(APIDbContext context, UserService userService)
        {
            _context = context;
            _userService = userService;
        }

        [HttpGet("getForProject/{projectId}")]
        public async Task<ActionResult<IEnumerable<TaskItem>>> GetTaskItemsByProject(int projectId)
        {
          var taskItems = await _context.TaskItems
              .Where(x => x.ProjectId == projectId)
              .Include(x => x.AssignedToUser)
              .Include(x => x.CreatedByUser)
              .ToListAsync();

          if (taskItems == null)
          {
              return NotFound();
          }

          return Ok(taskItems);
        }

        [HttpGet("getForUser/{userId}")]
        public async Task<ActionResult<IEnumerable<TaskItem>>> GetTaskItemsForUser(int userId)
        {
            var taskItems = await _context.TaskItems
                .Where(x => x.AssignedTo == userId)
                .ToListAsync();

            if (taskItems == null)
            {
                return NotFound();
            }

            return Ok(taskItems);
        }

        [HttpGet("upcoming")]
        public async Task<ActionResult<IEnumerable<TaskItem>>> GetUpcomingTaskItemsForUser()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            DateTime currentDate = DateTime.UtcNow;

            var upcomingTaskItems = await _context.TaskItems
                .Where(t => t.AssignedTo == userId && t.DueDate.HasValue && t.DueDate > currentDate)
                .OrderBy(t => t.DueDate)
                .ToListAsync();

            if (upcomingTaskItems == null)
            {
                return NotFound();
            }

            return upcomingTaskItems;
        }

        [HttpGet("outdated")]
        public async Task<ActionResult<IEnumerable<TaskItem>>> GetOutdatedTaskItemsForUser()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            DateTime currentDate = DateTime.UtcNow;

            var outdatedTaskItems = await _context.TaskItems
                .Where(t => t.AssignedTo == userId && t.DueDate.HasValue && t.DueDate < currentDate)
                .OrderBy(t => t.DueDate)
                .ToListAsync();

            if (outdatedTaskItems == null)
            {
                return NotFound();
            }

            return outdatedTaskItems;
        }

        [HttpGet("getTask/{id}")]
        public async Task<ActionResult<TaskItem>> GetTaskItem(int id)
        {
          if (_context.TaskItems == null)
          {
              return NotFound();
          }
            var taskItem = await _context.TaskItems.FindAsync(id);

            if (taskItem == null)
            {
                return NotFound();
            }

            return taskItem;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutTaskItem(int id, TaskItem updatedTaskItem)
        {
            var existingTaskItem = await _context.TaskItems.FindAsync(id);

            if (existingTaskItem == null)
            {
                return NotFound();
            }

            existingTaskItem.Title = updatedTaskItem.Title;
            existingTaskItem.Description = updatedTaskItem.Description;
            existingTaskItem.Status = updatedTaskItem.Status;
            existingTaskItem.DueDate = updatedTaskItem.DueDate;
            existingTaskItem.AssignedTo = updatedTaskItem.AssignedTo;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<TaskItem>> PostTaskItem(TaskItemDto taskItemDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var loggedInUserId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var CreatedByUser = _context.Users.FirstOrDefault(u => u.UserId == loggedInUserId);

            var newTaskItem = new TaskItem
            {
                Title = taskItemDto.Title,
                ProjectId = taskItemDto.ProjectId,
                Created_By = loggedInUserId,
                CreatedByUser = CreatedByUser,
                Status = taskItemDto.Status,
            };

            _context.TaskItems.Add(newTaskItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTaskItem", new { id = newTaskItem.TaskId }, newTaskItem);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTaskItem(int id)
        {
            if (_context.TaskItems == null)
            {
                return NotFound();
            }
            var taskItem = await _context.TaskItems.FindAsync(id);
            if (taskItem == null)
            {
                return NotFound();
            }

            _context.TaskItems.Remove(taskItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
