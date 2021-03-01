using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Exam.Data
{
    public class CellType
    {
        [Key]
        public int Id {get;set;}
        public string TypeName {get;set;}
        public List<Cell> Cells {get;set;}
    }
}