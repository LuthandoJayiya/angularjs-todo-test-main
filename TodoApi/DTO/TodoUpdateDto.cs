﻿namespace TodoApi.DTO
{
    public class TodoUpdateDto
    {
        public string? Title { get; set; }
        public string? Description { get; set; }

        public string? Status { get; set; }
        public string? Priority { get; set; }

        public DateTime? DueDate { get; set; }
    }
}
