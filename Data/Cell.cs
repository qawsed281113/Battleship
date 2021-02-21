using System.ComponentModel.DataAnnotations;

namespace Exam.Data
{
    public class Cell
    {
        [Key]
        public int Id {get;set;}
        public string CellData {get;set;}
    }
}