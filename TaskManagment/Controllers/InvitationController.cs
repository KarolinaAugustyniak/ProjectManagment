using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TaskManagment.Models;

namespace TaskManagment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvitationController : ControllerBase
    {
        private readonly APIDbContext _context;

        public InvitationController(APIDbContext context)
        {
            _context = context;
        }

        // generate a invitation code for an organization
        [HttpPost("generate")]
        public IActionResult GenerateInvitationCode(int expirationDays)
        {
            // get organization ID
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var user = _context.Users.FirstOrDefault(u => u.UserId == int.Parse(loggedInUserId));

            if (user == null)
            {
                return NotFound("User not found.");
            }

            int organizationId = user.OrganizationId;

            if (!_context.Organizations.Any(o => o.OrganizationId == organizationId))
            {
                return NotFound("Organization not found.");
            }

            // Generate a new invitation code
            string invitationCode = Guid.NewGuid().ToString().Replace("-", "").Substring(0, 8);

            // Create the invitation
            var invitation = new Invitation
            {
                InvitationCode = invitationCode,
                Expire = DateTime.UtcNow.AddDays(expirationDays), 
                OrganizationId = organizationId
            };

            _context.Invitations.Add(invitation);
            _context.SaveChanges();

            return Ok(invitation);
        }



    }
}
