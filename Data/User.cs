using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace Exam.Data
{
    public class User : IdentityUser
    {
        #nullable enable
        public string? NickName {get;set;}
        public Game? Game {get;set;}
        // [NotMapped]        
        // public Game Games {get;set;}
        // [NotMapped]
        // public int GameId {get;set;}

    }
}