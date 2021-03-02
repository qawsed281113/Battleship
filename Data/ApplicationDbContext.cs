using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Exam.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public DbSet<Game> Games { get; set; }
        public DbSet<Map> Maps {get; set;}
        public DbSet<User> Users {get;set;} 
        public DbSet<GameStatus> GameStatuses {get;set;}
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<GameStatus>(d =>
                d.HasData(new GameStatus[]{
                    new GameStatus{
                        id = 1,
                        Name = "playing"
                    },
                    new GameStatus{
                        id = 2,
                        Name = "over"
                    },
                    new GameStatus{
                        id = 3,
                        Name = "alone"
                    }
                })    
            );
                
        }
    }
}
