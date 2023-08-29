using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TaskManagment.Models;
using TaskManagment.Services;

namespace TaskManagment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly APIDbContext _context;
        private readonly UserService _userService;

        public ProjectsController(APIDbContext context, UserService userService)
        {
            _context = context;
            _userService = userService;
        }

        [HttpPost("create")]
        public IActionResult createProject([FromBody] string projectName)
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            int organizationId = _userService.GetOrganizationIdForLoggedInUser(loggedInUserId);

            var project = new Project
            {
                ProjectName = projectName,
                CreatedBy = int.Parse(loggedInUserId),
                OrganizationId = organizationId
            };

            _context.Projects.Add(project); 
            _context.SaveChanges();
            return Ok(project);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete([FromRoute]int id)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null)
            {
                return NotFound();
            }

            //only creator of project or organization can delete project
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            int organizationId = _userService.GetOrganizationIdForLoggedInUser(loggedInUserId);
            var organization = _context.Organizations.FirstOrDefault(o => o.OrganizationId == organizationId);

            if (project.CreatedBy == int.Parse(loggedInUserId) || organization.CreatedBy == int.Parse(loggedInUserId))
            {
                _context.Projects.Remove(project);
                await _context.SaveChangesAsync();

                return Ok("Project deleted successfully");
            }
            return Forbid();
        }

        [HttpGet("get")]
        public ActionResult<IEnumerable<Project>> GetProjectsForOrganization()
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            int organizationId = _userService.GetOrganizationIdForLoggedInUser(loggedInUserId);
            var projects = _context.Projects.Where(p => p.OrganizationId == organizationId);
            return Ok(projects);
        }
    }
}
