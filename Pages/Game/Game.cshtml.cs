using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace MyApp.Namespace
{
    public class GameModel : PageModel
    {
        public void OnGet()
        {
        }
        public async Task<IActionResult> OnGetAsync()
        {
            return Page();
        }
    }
}