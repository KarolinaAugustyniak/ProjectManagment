using TaskManagment.Models;

namespace TaskManagment.Services
{
    public class UserService
    {
        private readonly APIDbContext _context;

        public UserService(APIDbContext context)
        {
            _context = context;
        }

        public int GetOrganizationIdForLoggedInUser(string loggedInUserId)
        {
            var user = _context.Users.FirstOrDefault(u => u.UserId == int.Parse(loggedInUserId));

            if (user == null)
            {
                throw new InvalidOperationException("User not found.");
            }

            return user.OrganizationId;

        }
    }
}
