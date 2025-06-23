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

        [Required]
        [EnumDataType(typeof(TodoStatus))]
        public string Status { get; set; } = TodoStatus.Pending;

        [Required]
        [EnumDataType(typeof(TodoPriority))]
        public string Priority { get; set; } = TodoPriority.Medium;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? DueDate { get; set; }

        //foreign keys
        [ForeignKey("User")]
        public Guid UserId { get; set; }

        [JsonIgnore]
        public User? User { get; set; }
    }
    public static class TodoStatus
    {
        public const string Pending = "pending";
        public const string InProgress = "in-progress";
        public const string Completed = "completed";
    }

    public static class TodoPriority
    {
        public const string Low = "low";
        public const string Medium = "medium";
        public const string High = "high";
    }
}
