using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TodoApi.Data;
using TodoApi.DTO;
using TodoApi.Models;
using TodoApi.Services;

namespace TodoApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class TodosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly TodoService _todoService;

        public TodosController(ApplicationDbContext context, TodoService todoService)
        {
            _todoService = todoService;
            _context = context;
        }

        private Guid GetUserId() => Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoReadDto>>> GetTodos()
        {
            var userId = GetUserId();

            var todos = await _context.Todos
                .Where(t => t.UserId == userId)
                .Select(t => new TodoReadDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    Status = t.Status,
                    Priority = t.Priority,
                    CreatedAt = t.CreatedAt,
                    UpdatedAt = t.UpdatedAt,
                    DueDate = t.DueDate
                })
                .ToListAsync();

            return Ok(todos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TodoReadDto>> GetTodo(Guid id)
        {
            var userId = GetUserId();
            var todo = await _context.Todos
                .Where(t => t.Id == id && t.UserId == userId)
                .Select(t => new TodoReadDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    Status = t.Status,
                    Priority = t.Priority,
                    CreatedAt = t.CreatedAt,
                    UpdatedAt = t.UpdatedAt,
                    DueDate = t.DueDate
                })
                .FirstOrDefaultAsync();

            if (todo == null)
                return NotFound("Todo not found");

            return Ok(todo);
        }

        [HttpPost]
        public async Task<ActionResult<TodoReadDto>> CreateTodo([FromBody] TodoCreateDto dto)
        {
            var userId = GetUserId();
            var created = await _todoService.CreateTodoAsync(userId, dto);

            return CreatedAtAction(nameof(GetTodo), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<TodoReadDto>> UpdateTodo(Guid id, [FromBody] TodoUpdateDto dto)
        {
            var userId = GetUserId();
            var updated = await _todoService.UpdateTodoAsync(id, dto, userId);

            if (updated == null)
                return NotFound();

            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodo(Guid id)
        {
            var userId = GetUserId();
            var todo = await _context.Todos.FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

            if (todo == null)
                return NotFound();

            _context.Todos.Remove(todo);
            await _context.SaveChangesAsync();

            return Ok("Deleted todo successfully");
        }
    }
}
