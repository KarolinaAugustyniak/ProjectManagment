using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TaskManagment.Models;
using TaskManagment.Services;

namespace TaskManagment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvitationController : ControllerBase
    {
        private readonly APIDbContext _context;
        private readonly UserService _userService;

        public InvitationController(APIDbContext context, UserService userService)
        {
            _context = context;
            _userService = userService;
        }

        // generate a invitation code for an organization
        [HttpPost("generate/{expirationDays}")]
        public IActionResult GenerateInvitationCode(int expirationDays)
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            int organizationId = _userService.GetOrganizationIdForLoggedInUser(loggedInUserId);

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
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            int organizationId = _userService.GetOrganizationIdForLoggedInUser(loggedInUserId);

            var invitationCodes = _context.Invitations
                .Where(invitation => invitation.OrganizationId == organizationId)
                .ToList();

            return Ok(invitationCodes);
        }

        [HttpDelete("delete/{invitationCode}")]
        public IActionResult DeleteInvitationCode(string invitationCode)
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            int organizationId = _userService.GetOrganizationIdForLoggedInUser(loggedInUserId);

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

        [HttpPut("join/{invitationCode}")]
        public IActionResult JoinOrganization(string invitationCode)
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var user = _context.Users.FirstOrDefault(u => u.UserId == int.Parse(loggedInUserId));

            if (user == null)
            {
                throw new InvalidOperationException("User not found.");
            }

            var invitation = _context.Invitations.FirstOrDefault(i => i.InvitationCode == invitationCode);

            if (invitation == null)
            {
               return NotFound("Invitation not found.");
            }

            if (invitation.Expire < DateTime.UtcNow)
            {
                return BadRequest("Invitation has expired.");
            }

            user.OrganizationId = invitation.OrganizationId;
            _context.SaveChanges();

            return Ok("User joined organization successfully.");
        }

    }
}
