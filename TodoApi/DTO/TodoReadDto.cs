namespace TodoApi.DTO
{
    public class TodoReadDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }

        public string Status { get; set; } = "pending"; // pending | in-progress | completed
        public string Priority { get; set; } = "medium"; // low | medium | high

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DueDate { get; set; }
    }
}
