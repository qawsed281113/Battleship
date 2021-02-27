using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Exam.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace Exam.Pages.Game
{
    [Authorize]
    public class IndexModel : PageModel
    {
        private readonly ApplicationDbContext _context;
        private readonly SignInManager<User> _signInManager; 
        private readonly UserManager<User> _userManager;
        public IndexModel (Exam.Data.ApplicationDbContext context,
                           SignInManager<User> signInManager,
                           UserManager<User> userManager)
        {
            _context = context;
            _signInManager = signInManager;
            _userManager = userManager;
        }
        public IList<Exam.Data.Game> Games {get; set;}
        [BindProperty]
        public Exam.Data.Game Game {get; set;}
        public async Task<IActionResult> OnGetAsync()
        {
            Games = await _context.Games.ToListAsync();
            return Page();
        }
        public async Task<IActionResult> OnPostAsync()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user  = _context.Users.Find(userId);
            List<Exam.Data.User> users = new List<Exam.Data.User>();
            List<Exam.Data.Map> maps = new List<Exam.Data.Map>();
            var sellTypes = new List<Exam.Data.CellType>();
            sellTypes.Add(new Exam.Data.CellType{
                TypeName = "ship"
            });
            var cells = new List<Exam.Data.Cell>();
            cells.Add(new Exam.Data.Cell{
                CellTypes = sellTypes
            });
            maps.Add(new Exam.Data.Map{
                Cells = cells
            });
            maps.Add(new Exam.Data.Map{
            Cells = cells
            });

            users.Add((Exam.Data.User)user);
            var game = new Exam.Data.Game{
                Users = users,
                UserTurn = (Exam.Data.User)user,
                Maps = maps
            };
            Game = game;
            _context.Games.Add(game);
            _context.SaveChanges();
            return Redirect("/Game/CreateMap?id=" + Game.Id);
        }
        public async Task<IActionResult> OnPostVisit()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user  = _context.Users.Find(userId);
            var game = _context.Games.Include(g => g.Users).Include(g => g.UserTurn).Where(g => g.Id == Game.Id);
            var Game2 = await game.FirstOrDefaultAsync();
            var user2 = Game2.Users.FirstOrDefault();
            if(user.Id == user2.Id)
            {
                return NotFound();
            }
            return Redirect("/Game/CreateMap?id="+Game.Id);
        }
    }
}
