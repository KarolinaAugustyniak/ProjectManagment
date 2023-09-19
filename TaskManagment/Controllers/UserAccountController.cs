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



        //// Set Profile Image
        //[HttpPost("setprofileimage")]
        //[RequestSizeLimit(valueCountLimit: 2147483648)]

        //public async Task<IActionResult> SetProfileImage([FromBody] string base64Image)
        //{
        //    var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
        //    var user = await _context.Users.FirstOrDefaultAsync(u => u.UserId == userId);

        //    if (user == null)
        //    {
        //        return NotFound();
        //    }

        //    byte[] imageBytes = Convert.FromBase64String(base64Image);
        //    string fileName = $"profile_{userId}_{DateTime.Now:yyyyMMddHHmmss}.jpg";
        //    string imagePath = Path.Combine("react", "src", "assets", "profile_images", fileName);

        //    await System.IO.File.WriteAllBytesAsync(imagePath, imageBytes);
        //    user.ProfileImageFileName = fileName;

        //    await _context.SaveChangesAsync();

        //    return Ok();
        //}

        //[HttpPost("upload")]

        //public async Task<IActionResult> UploadProfileImage(IFormFile file)
        //{
        //    int userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
        //    if (file != null && file.Length > 0)
        //    {
        //        // Get the user by ID
        //        var user = await _context.Users.FindAsync(userId);

        //        if (user != null)
        //        {
        //            // Generate a unique file name for the uploaded image
        //            var uniqueFileName = Guid.NewGuid().ToString() + "_" + file.FileName;

        //            // Combine the unique file name with the web root path to create a complete file path
        //            //  var filePath = Path.Combine(_webHostEnvironment.WebRootPath, "profileimages", uniqueFileName);
        //            //  string imagePath = Path.Combine("react", "src", "assets", "profile_images", uniqueFileName);


        //            // Specify the directory where you want to save the uploaded image
        //            var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");

        //            // Create the directory if it doesn't exist
        //            if (!Directory.Exists(uploadPath))
        //            {
        //                Directory.CreateDirectory(uploadPath);
        //            }

        //            var filePath = Path.Combine(uploadPath, uniqueFileName);



        //            // Save the uploaded file to the server

        //            using (var stream = new FileStream(filePath, FileMode.Create))
        //            {
        //                await file.CopyToAsync(stream);
        //            }

        //            // Update the user's ProfileImageFileName property with the unique file name
        //           // user.ProfileImageFileName = uniqueFileName;

        //            // Save the changes to the database
        //            await _context.SaveChangesAsync();
        //            return Ok(new { filePath });
        //        }
        //    }

        //    return RedirectToAction("Profile", new { id = userId });
        //}


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

                var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "react", "src", "assets", "profile_images");

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
