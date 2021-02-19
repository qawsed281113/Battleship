using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Exam.Data
{
    public class Map
    {
        public IdentityUser Owner {get; set;}
        public List<int> map {get; set;} 
    }
}