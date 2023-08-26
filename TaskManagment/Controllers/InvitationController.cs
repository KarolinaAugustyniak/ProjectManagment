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
            int organizationId = GetOrganizationIdForLoggedInUser();

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

        [HttpGet("invitations")]
        public IActionResult GetInvitationCodesForOrganization()
        {
            int organizationId = GetOrganizationIdForLoggedInUser();

            var invitationCodes = _context.Invitations
                .Where(invitation => invitation.OrganizationId == organizationId)
                .ToList();

            return Ok(invitationCodes);
        }

        [HttpDelete("delete/{invitationCode}")]
        public IActionResult DeleteInvitationCode(string invitationCode)
        {
            int organizationId = GetOrganizationIdForLoggedInUser();

            var invitation = _context.Invitations
                .FirstOrDefault(invitation => invitation.OrganizationId == organizationId && invitation.InvitationCode == invitationCode);

            if (invitation == null)
            {
                return NotFound("Invitation code not found.");
            }

            _context.Invitations.Remove(invitation);
            _context.SaveChanges();

            return Ok("Invitation code deleted.");
        }

      
        private int GetOrganizationIdForLoggedInUser()
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var user = _context.Users.FirstOrDefault(u => u.UserId == int.Parse(loggedInUserId));

            if (user == null)
            {
                throw new InvalidOperationException("User not found.");
            }

            int organizationId = user.OrganizationId;
            return organizationId;
        }

    }
}
