using System;
using System.Collections.Generic;
using System.Linq;
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
        // public void OnGet()
        // {
        // }
        public async Task<IActionResult> OnGetAsync()
        {
            Games = await _context.Games.ToListAsync();
            return Page();
        }
        public async void OnPost()
        {

        }
    }
}
