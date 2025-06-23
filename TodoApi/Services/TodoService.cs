using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.DTO;
using TodoApi.Models;

namespace TodoApi.Services
{
    public class TodoService
    {
        private readonly ApplicationDbContext _context;

        public TodoService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<TodoReadDto> CreateTodoAsync(Guid userId, TodoCreateDto dto)
        {
            var todo = new Todo
            {
                Title = dto.Title,
                Description = dto.Description,
                Status = dto.Status ?? "pending",
                Priority = dto.Priority ?? "medium",
                DueDate = dto.DueDate,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                UserId = userId
            };

            _context.Todos.Add(todo);
            await _context.SaveChangesAsync();

            return new TodoReadDto
            {
                Id = todo.Id,
                Title = todo.Title,
                Description = todo.Description,
                Status = todo.Status,
                Priority = todo.Priority,
                CreatedAt = todo.CreatedAt,
                UpdatedAt = todo.UpdatedAt,
                DueDate = todo.DueDate
            };
        }

        public async Task<TodoReadDto?> UpdateTodoAsync(Guid id, TodoUpdateDto dto, Guid userId)
        {
            var todo = await _context.Todos.FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

            if (todo == null) return null;

            if (!string.IsNullOrWhiteSpace(dto.Title)) todo.Title = dto.Title;
            if (!string.IsNullOrWhiteSpace(dto.Description)) todo.Description = dto.Description;
            if (!string.IsNullOrWhiteSpace(dto.Status)) todo.Status = dto.Status;
            if (!string.IsNullOrWhiteSpace(dto.Priority)) todo.Priority = dto.Priority;
            if (dto.DueDate.HasValue) todo.DueDate = dto.DueDate.Value;

            todo.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return new TodoReadDto
            {
                Id = todo.Id,
                Title = todo.Title,
                Description = todo.Description,
                Status = todo.Status,
                Priority = todo.Priority,
                CreatedAt = todo.CreatedAt,
                UpdatedAt = todo.UpdatedAt,
                DueDate = todo.DueDate
            };
        }
    }
}
