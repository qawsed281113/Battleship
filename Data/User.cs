using Microsoft.AspNetCore.Identity;

namespace Exam.Data
{
    public class User : IdentityUser
    {
        public string NickName {get;set;}
    }
}