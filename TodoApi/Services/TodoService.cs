using Microsoft.AspNetCore.Mvc;
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
                IsCompleted = false,
                UserId = userId
            };

            _context.Todos.Add(todo);
            await _context.SaveChangesAsync();

            return new TodoReadDto
            {
                Id = todo.Id,
                Title = todo.Title,
                Description = todo.Description,
                IsCompleted = todo.IsCompleted
            };
        }

        public async Task<TodoReadDto?> UpdateTodoAsync(Guid Id, TodoUpdateDto dto, Guid userId)
        {
            var todo = await _context.Todos.FirstOrDefaultAsync(t => t.Id == Id && t.UserId == userId);

            if (todo == null) return null;

            if(dto.Title!=null) todo.Title = dto.Title;
            if (dto.Description != null) todo.Description = dto.Description;
            if (dto.IsCompleted.HasValue)  todo.IsCompleted = dto.IsCompleted.Value;


            await _context.SaveChangesAsync();


            return new TodoReadDto
            {
                Id = todo.Id,
                Title = todo.Title,
                Description = todo.Description,
                IsCompleted = todo.IsCompleted
            };
        }
    }
}
