using TaskManagment.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace TaskManagment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IConfiguration _config;
        private readonly APIDbContext _context;

        public AuthController(IConfiguration config, APIDbContext context)
        {
            _config = config;
            _context = context;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Login([FromBody] UserLogin userLogin)
        {
            var user = Authenticate(userLogin);

            if (user != null)
            {
                var token = Generate(user);
                return Ok(token);
            }

            return NotFound("User not found");
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegister userRegister)
        {
            // Check if the username or email is already taken
            if (await IsUsernameTaken(userRegister.Username))
            {
                return BadRequest("Username is already taken.");
            }

            if (await IsEmailTaken(userRegister.Email))
            {
                return BadRequest("Email is already taken.");
            }

            // Hash the password using BCrypt
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(userRegister.PasswordHash);

            var newUser = new User(userRegister.Username, userRegister.Email, passwordHash, userRegister.Position);
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            var token = Generate(newUser);
            return Ok(token);
        }

        private async Task<bool> IsUsernameTaken(string username)
        {
            return await _context.Users.AnyAsync(u => u.Username.ToLower() == username.ToLower());
        }

        private async Task<bool> IsEmailTaken(string email)
        {
            return await _context.Users.AnyAsync(u => u.Email.ToLower() == email.ToLower());
        }

        private string Generate(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Email, user.Email)
            };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Audience"],
              claims,
              expires: DateTime.Now.AddMinutes(480),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private User Authenticate(UserLogin userLogin)
        {
            var currentUser = _context.Users.FirstOrDefault(o => o.Username.ToLower() == userLogin.Username.ToLower());

            if (currentUser != null && BCrypt.Net.BCrypt.Verify(userLogin.PasswordHash, currentUser.PasswordHash))
            {
                return currentUser;
            }

            return null;

        }

 
    }
}
