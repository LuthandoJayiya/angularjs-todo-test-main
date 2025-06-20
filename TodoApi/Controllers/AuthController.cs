using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TodoApi.Data;
using TodoApi.DTO;
using TodoApi.Models;
using TodoApi.Services;

namespace TodoApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;
        private readonly ApplicationDbContext _context;

        public AuthController(AuthService auth, ApplicationDbContext context)
        {
            _authService = auth;
            _context = context;
        }

        [HttpPost("register")]
        public IActionResult Register(RegisterRequest request)
        {
            if (_authService.UserExists(request.Username))
                return BadRequest("Username already exists.");

            var hashedPass = _authService.CreatePasswordHash(request.Password);

            var user = new User
            {
                Username = request.Username,
                Name = request.Name,
                Email = request.Email,
                Surname = request.Surname,
                PasswordHash = hashedPass

            };

            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok("User registered successfully.");

        }

        [HttpPost("login")]
        [AllowAnonymous]
        public IActionResult Login(LoginRequest request)
        {
            var user = _context.Users.FirstOrDefault(u =>
                u.Username.ToLower() == request.Username.ToLower());

            if (user == null || !_authService.VerifyPassword(request.Password, user.PasswordHash))
                return Unauthorized("Invalid username or password.");

            var token = _authService.CreateJwtToken(user);

            return Ok(new AuthResponse
            {
                Token = token,
                Username = user.Username
            });
        }
    }
}
