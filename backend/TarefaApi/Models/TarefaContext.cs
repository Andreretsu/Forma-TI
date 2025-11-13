using Microsoft.EntityFrameworkCore;

namespace TarefaApi.Models
{
    public class TarefaContext : DbContext
    {
        public TarefaContext(DbContextOptions<TarefaContext> options)
            : base(options)
        {
        }

        public DbSet<Tarefa> Tarefas { get; set; } = null!;
    }
}