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

namespace MyApp.Namespace
{
    public class NewGameModel : PageModel
    {
        private readonly Exam.Data.ApplicationDbContext _context;
        private readonly SignInManager<Exam.Data.User> _signInManager;
        private readonly UserManager<Exam.Data.User> __userManager;

        public NewGameModel(Exam.Data.ApplicationDbContext context, SignInManager<Exam.Data.User> signInManager, UserManager<Exam.Data.User> userManager)
        {
            _context = context;
            _signInManager = signInManager;
            __userManager = userManager;
        }
        [BindProperty]
        public Exam.Data.Game Game {get; set;}
        public async Task<IActionResult> OnGetAsync()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user  = _context.Users.Find(userId);
            ICollection<Exam.Data.User> users = new List<Exam.Data.User>();
            List<Exam.Data.Map> maps = new List<Exam.Data.Map>();
            maps.Add(new Exam.Data.Map());
            maps.Add(new Exam.Data.Map());
            users.Add((Exam.Data.User)user);
            var game = new Exam.Data.Game{
                Users = users,
                UserTurn = (Exam.Data.User)user,
                Maps = maps
            };
            Game =game;
            _context.Games.Add(game);
            _context.SaveChanges();
            return Page();
        }
    }
}
