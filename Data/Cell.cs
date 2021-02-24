using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Exam.Data
{
    public class Cell
    {
        [Key]
        public int Id {get;set;}
        public int cellNum {get;set;}
        public ICollection<CellType> CellTypes {get;set;}
    }
}