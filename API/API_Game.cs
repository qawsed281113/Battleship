using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Exam.Data;

namespace Exam.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class API_Game : ControllerBase 
    {
        private readonly ApplicationDbContext _context;
        public API_Game (ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Exam.Data.Game>>> GetGames()
        {
            return await _context.Games.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Exam.Data.Game>> GetGame(int id)
        {
            var game = await _context.Games.Where(g => g.Id == id).Select(g => new Game {
                Id = g.Id, 
                Maps = g.Maps.ToList(),
                Users = g.Users,
                GameStatus = g.GameStatus,
                UserTurnId = g.UserTurnId
            }).FirstOrDefaultAsync();
            if (game == null)
            {
                return NotFound();
            }

            return game;
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGame(int id, [FromBody] Exam.Data.Game game)
        {
            if(id != game.Id)
            {
                return BadRequest();
            }
            _context.Entry(game).State = EntityState.Modified;
            
            for(int i = 0; i < game.Maps.Count; ++i){
                game.Maps[i].Owner = _context.Users.Find(game.Maps[i].Owner.Id);
                game.Maps[i].Game = game;
            }
            await _context.Maps.AddRangeAsync(game.Maps);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if(!GameExist(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        } 
        [HttpPost]
        public async Task<ActionResult<Exam.Data.Game>> PostGame (Exam.Data.Game game)
        {
            if(game == null)
            {
                return BadRequest();
            }
            _context.Games.Add(game);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGame", new {id = game.Id}, game);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGame (int id)
        {
            var game = await _context.Games.FindAsync(id);
            if(game == null)
            {
                return NotFound();
            }
            _context.Games.Remove(game);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool GameExist (int id)
        {
            return _context.Games.Any(e => e.Id == id);
        }
    }
}