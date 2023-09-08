using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskManagment.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

//using TaskManagment.Data;

namespace TaskManagment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrganizationsController : ControllerBase
    {
        private readonly APIDbContext _context;

        public OrganizationsController(APIDbContext context)
        {
            _context = context;
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

    }
}
