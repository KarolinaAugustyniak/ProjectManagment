using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskManagment.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using TaskManagment.Services;

//using TaskManagment.Data;

namespace TaskManagment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrganizationsController : ControllerBase
    {
        private readonly APIDbContext _context;
        private readonly UserService _userService;

        public OrganizationsController(APIDbContext context, UserService userService)
        {
            _context = context;
            _userService = userService;
        }

        [HttpPost]
        public IActionResult CreateOrganization([FromBody] string organization)
        {
            // Get the currently logged-in user's ID
            if (int.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out int loggedInUserId))
            {
                // Fetch the user from the database
                User loggedInUser = _context.Users.FirstOrDefault(u => u.UserId == loggedInUserId);

                if (loggedInUser == null)
                {
                    return NotFound("Logged-in user not found.");
                }

                // Create the organization
                Organization newOrganization = new Organization
                {
                    OrganizationName = organization,
                    CreatedBy = loggedInUserId,
                    User = loggedInUser
                };

                _context.Organizations.Add(newOrganization);
                _context.SaveChanges();

                loggedInUser.OrganizationId = newOrganization.OrganizationId;
                _context.SaveChanges();

                return Ok();
            }
            return NotFound("Logged-in user not found.");

        }

        [HttpGet("getUsers")]
        public ActionResult<IEnumerable<User>> GetUsersForOrganization()
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            int organizationId = _userService.GetOrganizationIdForLoggedInUser(loggedInUserId);

            var usersForOrganization = _context.Users
                .Where(u => u.OrganizationId == organizationId)
                .ToList();

            return Ok(usersForOrganization);
        }
    }
}
