using System;
using Microsoft.AspNetCore.Identity;

namespace Exam.Data
{
    public class User : IdentityUser
    {
        #nullable enable
        public string? NickName {get;set;}
    }
}