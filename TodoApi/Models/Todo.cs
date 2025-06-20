using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace TodoApi.Models
{
    public class Todo
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required] public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }

        public bool IsCompleted { get; set; } = false;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        //foreign keys
        [ForeignKey("User")]
        public Guid UserId { get; set; }

        [JsonIgnore]
        public User? User { get; set; }
    }
}
