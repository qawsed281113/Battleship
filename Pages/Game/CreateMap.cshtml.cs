using System.Reflection.Metadata;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
// using Exam.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Exam.Data;

namespace Exam.Pages.Game
{
    public class CreateMap : PageModel
    {
        private readonly Exam.Data.ApplicationDbContext _context;
        private readonly SignInManager<Exam.Data.User> _signInManager;
        private readonly UserManager<Exam.Data.User> __userManager;

        public CreateMap(ApplicationDbContext context, SignInManager<User> signInManager, UserManager<User> userManager)
        {
            _context = context;
            _signInManager = signInManager;
            __userManager = userManager;
        }

        [BindProperty]
        public Exam.Data.Game Game {get; set;}
        [BindProperty]
        public  Exam.Data.User Player {get; set;}

        public async Task<IActionResult> OnGetAsync(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user_find  = _context.Users.Include(u => u.Game).Where(u => u.Id == userId);
            Player = user_find.FirstOrDefault();
            var p =  _context.Games.Include(i => i.Users).Where(i => i.Id == id);
            Game = await p.FirstOrDefaultAsync();
            return Page();
        }

    }
}