using FilmQZ.App.App_Start;
using FilmQZ.App.Authentication.Constants;
using FilmQZ.App.BusinessLogic.Helpers;
using FilmQZ.App.Models.Management.Game;
using FilmQZ.Core;
using FilmQZ.Core.Entities;
using FilmQZ.Core.Entities.Relations;
using FilmQZ.Core.Extensions;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;

namespace FilmQZ.App.Controllers.Api.Management
{
    [RoutePrefix("api/management/game")]
    public class GameController : ApiController
    {
        private readonly ApplicationUserManager userManager;
        private readonly DatabaseContext dbContext;
        private readonly URLHelpers urlHelpers;

        public GameController(ApplicationUserManager userManager, DatabaseContext dbContext, URLHelpers urlHelpers)
        {
            this.userManager = userManager;
            this.dbContext = dbContext;
            this.urlHelpers = urlHelpers;
        }

        [Route("")]
        [HttpGet]
        public async Task<IHttpActionResult> GetGames(CancellationToken cancellationToken)
        {
            var userId = User.Identity.GetUserId();
            var games = from g in dbContext.Games
                        where g.GameMasterId == userId
                        select new EntityModel()
                        {
                            Id = g.Id,
                            IsOpen = g.IsOpen,
                            Name = g.Name,
                            URL = g.URL,
                            CreatedDate = g.CreatedDate
                        };

            var result = await games.ToListAsync(cancellationToken);
            return Ok(result);
        }

        [Route("{id:Guid}", Name = "manageGameId")]
        [HttpGet]
        public async Task<IHttpActionResult> GetGame(Guid id, CancellationToken cancellationToken)
        {
            var userId = User.Identity.GetUserId();
            var games = from g in dbContext.Games
                        where g.Id == id && g.GameMasterId == userId
                        select new ListItem()
                        {
                            Id = g.Id,
                            IsOpen = g.IsOpen,
                            Name = g.Name,
                            URL = g.URL,
                            CreatedDate = g.CreatedDate
                        };

            var result = await games.SingleOrDefaultAsync(cancellationToken);
            return Ok(result);
        }

        [Route("")]
        [HttpPut]
        [Authorize(Roles = UserRoles.GameMaster)]
        public async Task<IHttpActionResult> UpdateGame(UpdateModel model, CancellationToken cancellationToken)
        {
            if (ModelState.IsValid)
            {
                var userId = User.Identity.GetUserId();
                var entity = dbContext.Games.SingleOrDefault(g => g.Id == model.Id && g.GameMasterId == userId);
                if (entity == null)
                {
                    return NotFound();
                }
                else
                {
                    if (await GetGameExistsAsync(model, cancellationToken))
                    {
                        return Conflict();
                    }
                    else
                    {
                        entity.Name = model.Name;
                        entity.URL = urlHelpers.GenerateCleanURL(model.Name);
                        await dbContext.SaveChangesAsync(cancellationToken);
                        return Ok();
                    }
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpPost]
        [Route("")]
        public async Task<IHttpActionResult> CreateGame(CreateModel createModel, CancellationToken cancellationToken)
        {
            if (ModelState.IsValid)
            {
                var userId = User.Identity.GetUserId();
                await AddUserToGameMasterRoleAsync(userId);

                if (await GetGameExistsAsync(createModel, cancellationToken))
                {
                    return Conflict();
                }
                else
                {
                    var gameUrl = this.urlHelpers.GenerateCleanURL(createModel.Name);
                    var newGame = new Game()
                    {
                        GameMasterId = userId,
                        Name = createModel.Name,
                        URL = gameUrl
                    };

                    newGame.AddUser(userId);

                    this.dbContext.Games.Add(newGame);

                    await this.dbContext.SaveChangesAsync(cancellationToken);

                    var manageUrl = Url.Link("manageGameId", new { id = newGame.Id });
                    var model = new EntityModel()
                    {
                        CreatedDate = newGame.CreatedDate,
                        Id = newGame.Id,
                        IsOpen = newGame.IsOpen,
                        ManageUrl = manageUrl,
                        Name = newGame.Name,
                        URL = newGame.URL
                    };


                    return Ok(model);
                }
            }
            return BadRequest(ModelState);
        }

        private async Task<bool> GetGameExistsAsync(CreateModel createModel, CancellationToken cancellationToken)
        {
            return await this.dbContext.Games.AnyAsync(g => g.Name == createModel.Name, cancellationToken);
        }

        private async Task AddUserToGameMasterRoleAsync(string userId)
        {
            if (User.IsInRole(UserRoles.GameMaster) == false)
            {
                await this.userManager.AddToRoleAsync(userId, UserRoles.GameMaster);
            }
        }
    }
}
