namespace TodoApi.DTO
{
    public class TodoCreateDto
    {
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }

        public string Status { get; set; } = "pending";
        public string Priority { get; set; } = "medium";

        public DateTime? DueDate { get; set; }
    }
}
