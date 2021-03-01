using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Exam.Data
{
    public class GameStatus
    {
        [Key]
        public int id {get;set;}
        // public ICollection<Game> Games {get;set;}
        public string Name {get;set;}
    }
}