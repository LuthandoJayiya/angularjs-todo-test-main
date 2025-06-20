using System.ComponentModel.DataAnnotations;

namespace TodoApi.Models
{
    public class User
    {
        public Guid Id { get; set; }

        [Required] public string Name { get; set; } = string.Empty;
        [Required] public string Surname { get; set; } = string.Empty;

        [Required] public string Email { get; set; } = string.Empty;

        [Required] public string Username { get; set; } = string.Empty;

        public string PasswordHash { get; set; } = string.Empty;


        public ICollection<Todo>? Todos { get; set; }


    }
}
