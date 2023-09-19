using Azure;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IO;
using System.Security.Claims;
using TaskManagment.Models;
using TaskManagment.Services;


namespace TaskManagment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserAccountController : ControllerBase
    {
        private readonly APIDbContext _context;
        private readonly UserService _userService;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public UserAccountController(APIDbContext context, UserService userService, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _userService = userService;
            _webHostEnvironment = webHostEnvironment;

        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadImage(IFormFile file)
          {
          try
            {
                if (file == null || file.Length == 0)
                {
                    return BadRequest("Invalid file");
                }

                int userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
                var user = await _context.Users.FindAsync(userId);
                if (user == null)
                {
                    return NotFound("User not found");
                }

                var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");

                if (!Directory.Exists(uploadPath))
                {
                    Directory.CreateDirectory(uploadPath);
                }

                var uniqueFileName = Guid.NewGuid().ToString() + "_" + file.FileName;

                var filePath = Path.Combine(uploadPath, uniqueFileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                user.ProfileImageFileName = uniqueFileName;
                await _context.SaveChangesAsync();
              
                return Ok(new { filePath });
          }
          catch (Exception ex)
          {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
          }
        }
   




    }
}
