using FilmQZ.App.App_Start;
using FilmQZ.App.Authentication.Constants;
using FilmQZ.App.Models.Management.Game;
using FilmQZ.Core;
using FilmQZ.Core.Entities;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace FilmQZ.App.Controllers.Api.Management
{
    [RoutePrefix("api/management/game")]
    public class GameController : ApiController
    {
        private readonly ApplicationUserManager userManager;
        private readonly DatabaseContext dbContext;

        public GameController(ApplicationUserManager userManager, DatabaseContext dbContext)
        {
            this.userManager = userManager;
            this.dbContext = dbContext;
        }

        [HttpPost]
        [Route("Create")]
        public async Task<IHttpActionResult> CreateGame(CreateModel createModel)
        {
            if (ModelState.IsValid)
            {
                var userId = User.Identity.GetUserId();
                if (User.IsInRole(UserRoles.GameMaster) == false)
                {
                    await this.userManager.AddToRoleAsync(userId, UserRoles.GameMaster);
                }
                if (this.dbContext.Games.Any(g => g.Name == createModel.Name))
                {
                    return Conflict();
                }
                else
                {
                    var newGame = new Game()
                    {
                        GameMasterId = userId,
                        Name = createModel.Name
                    };

                    this.dbContext.Games.Add(newGame);
                    await this.dbContext.SaveChangesAsync();

                    return Ok();
                }
            }
            return BadRequest(ModelState);
        }
    }
}
