using TodoApi.Data;
using BCrypt.Net;
using System.Security.Claims;
using TodoApi.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace TodoApi.Services
{
    public class AuthService
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        //Inject the context and configuration so that it is available DI
        public AuthService(ApplicationDbContext context, IConfiguration config)
        {
            _context = context;
            _configuration = config;
        }

        //check if the user exits or not
        public bool UserExists(string email) => _context.Users.Any(user=>user.Email.ToLower() == email.ToLower());

        //create password hash
        public string CreatePasswordHash(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }


        //verify password
        public bool VerifyPassword(string password, string hashedPassword)
        {
            return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
        }

        //create a jwt token
        public string CreateJwtToken(User user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            };
            Console.WriteLine("JWT_KEY: " + _configuration["JWT_KEY"]);
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
               _configuration["JWT_KEY"] ?? throw new Exception("JWT_KEY missing")));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT_ISSUER"],
                audience: _configuration["JWT_AUDIENCE"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(
                    int.Parse(_configuration["JWT_DURATION_MINUTES"] ?? "60")),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        
    }
}
