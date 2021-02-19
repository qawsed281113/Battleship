using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Exam.Data 
{
    public class Game 
    {
        [Key]
        public int Id {get; set;}
        public List<IdentityUser> Users {get; set;}
        public IdentityUser UserTurn {get; set;}
        public List<Map> Maps { get; set; }

    }
}