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
            var alone = await _context.GameStatuses.FindAsync(3);
            Games = await _context.Games.Where(u => u.GameStatus == alone).ToListAsync();
            return Page();
        }
        public async Task<IActionResult> OnPostAsync()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user_find  = _context.Users.Include(u => u.Game).Where(u => u.Id == userId);
            var user = user_find.FirstOrDefault();
            this.disableGame();
            List<Exam.Data.User> users = new List<Exam.Data.User>();
            users.Add((Exam.Data.User)user);
            var game = new Exam.Data.Game{
                Users = users,
                GameStatus = _context.GameStatuses.Find(3),
                UserTurnId = user.Id,
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
            var game = _context.Games.Include(g => g.Users).Where(g => g.Id == Game.Id);
            var Game2 = game.FirstOrDefault();
            var user2 = Game2.Users.FirstOrDefault();
            if(user.Id == user2.Id)
            {
                return NotFound();
            }
            return Redirect("/Game/CreateMap?id="+Game.Id);
        }
        private  async void disableGame()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user_find  = _context.Users.Include(u => u.Game).Where(u => u.Id == userId);
            var user = user_find.FirstOrDefault();
            try
            {
                var game_delete = await _context.Games.FindAsync(user.Game.Id);
                var status_stop = await _context.GameStatuses.FindAsync(2);
                game_delete.GameStatus = status_stop;
            }
            catch
            {
                
            }
        }
    }
}
