﻿namespace TodoApi.DTO
{
    public class TodoUpdateDto
    {
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public bool? IsCompleted { get; set; }
    }
}
