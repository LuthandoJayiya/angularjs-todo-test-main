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
    public class TodosController : Controller
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
        public async Task<ActionResult<IEnumerable<Todo>>> GetTodos()
        {
            var userId = GetUserId();
            var todos = await _context.Todos.Where(t=>t.UserId==userId).ToListAsync();
            return Ok(todos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Todo>> GetTodo(Guid id)
        {
            var userID = GetUserId();
            var todo = await _context.Todos.FirstOrDefaultAsync(t=>t.UserId==userID && t.Id==id);

            if (todo == null) return NotFound("No Todos Founds");
            return Ok(todo);
        }

        [HttpPost]
        public async Task<ActionResult<TodoReadDto>> CreateTodo([FromBody] TodoCreateDto dto)
        {
            var UserId = GetUserId();
            var results = await _todoService.CreateTodoAsync(UserId, dto);
            return CreatedAtAction(nameof(GetTodo), new {id=results.Id}, results);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<TodoReadDto>> UpdateTodo(Guid id, [FromBody] TodoUpdateDto dto)
        {
            var userId = GetUserId();
            var results = await _todoService.UpdateTodoAsync(id, dto, userId);

            if (results == null) return NotFound();

            return Ok(results);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodo(Guid id)
        {
            var userId = GetUserId();
            var todo = await _context.Todos.FirstOrDefaultAsync(t=>t.Id==id&&t.UserId==userId);

            if(todo == null) return NotFound();

            _context.Todos.Remove(todo);
            await _context.SaveChangesAsync();
            return Ok("Deleted todo sucessfully");
        }
    }
}
