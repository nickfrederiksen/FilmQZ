using FilmQZ.App.App_Start;
using FilmQZ.App.Authentication.Constants;
using FilmQZ.App.BusinessLogic.Helpers;
using FilmQZ.App.BusinessLogic.Interfaces;
using FilmQZ.App.Models.Management.Game;
using FilmQZ.Core;
using FilmQZ.Core.Entities;
using FilmQZ.Core.Entities.Relations;
using FilmQZ.Core.Extensions;
using FilmQZ.Core.Logging;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace FilmQZ.App.Controllers.Api.Management
{
    [RoutePrefix("api/management/game")]
    public class GameController : ApiController, ICrudController<UpdateGameModel, CreateGameModel>
    {
        private readonly DatabaseContext dbContext;
        private readonly URLHelpers urlHelpers;
        private readonly LogHelper logHelper;

        public GameController(DatabaseContext dbContext, URLHelpers urlHelpers, LogHelper logHelper)
        {
            this.dbContext = dbContext;
            this.urlHelpers = urlHelpers;
            this.logHelper = logHelper;
        }

        [Route("")]
        [HttpGet]
        [ResponseType(typeof(IEnumerable<GameListItemModel>))]
        public async Task<IHttpActionResult> GetAll(CancellationToken cancellationToken)
        {
            var userId = User.Identity.GetUserId();
            var games = from g in dbContext.Games
                        where g.GameMasterId == userId
                        select new GameListItemModel()
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
        [ResponseType(typeof(GameEntityModel))]
        public async Task<IHttpActionResult> GetSingle(Guid id, CancellationToken cancellationToken)
        {
            var userId = User.Identity.GetUserId();
            var games = from g in dbContext.Games
                        where g.Id == id
                        select new
                        {
                            Id = g.Id,
                            IsOpen = g.IsOpen,
                            Name = g.Name,
                            URL = g.URL,
                            CreatedDate = g.CreatedDate,
                            GameMasterId = g.GameMasterId
                        };

            var result = await games.SingleOrDefaultAsync(cancellationToken);
            if (result == null)
            {
                return NotFound();
            }
            else if (result.GameMasterId != userId)
            {
                return StatusCode(HttpStatusCode.Forbidden);
            }

            var model = new GameEntityModel()
            {
                Id = result.Id,
                CreatedDate = result.CreatedDate,
                IsOpen = result.IsOpen,
                Name = result.Name,
                URL = result.URL
            };

            return Ok(model);
        }

        [Route("{id:Guid}")]
        [HttpPut]
        public async Task<IHttpActionResult> Update(Guid id, UpdateGameModel model, CancellationToken cancellationToken)
        {
            if (ModelState.IsValid)
            {
                var entity = await dbContext.Games.SingleOrDefaultAsync(g => g.Id == id, cancellationToken);
                if (entity == null)
                {
                    return NotFound();
                }
                else
                {
                    var userId = User.Identity.GetUserId();
                    if (entity.GameMasterId != userId)
                    {
                        return StatusCode(HttpStatusCode.Forbidden);
                    }
                    if (await GetGameExistsAsync(model, id, cancellationToken))
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
        [ResponseType(typeof(GameEntityModel))]
        public async Task<IHttpActionResult> Create(CreateGameModel createModel, CancellationToken cancellationToken)
        {
            if (ModelState.IsValid)
            {
                if (await GetGameExistsAsync(createModel, null, cancellationToken))
                {
                    return Conflict();
                }
                else
                {
                    var userId = User.Identity.GetUserId();
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
                    
                    var model = new GameEntityModel()
                    {
                        CreatedDate = newGame.CreatedDate,
                        Id = newGame.Id,
                        IsOpen = newGame.IsOpen,
                        Name = newGame.Name,
                        URL = newGame.URL
                    };


                    return Ok(model);
                }
            }
            return BadRequest(ModelState);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IHttpActionResult> Delete(Guid id, CancellationToken cancellationToken)
        {
            var userId = User.Identity.GetUserId();
            var game = await dbContext.Games.SingleOrDefaultAsync(g => g.Id == id, cancellationToken);
            if (game == null)
            {
                return NotFound();
            }
            else if (game.GameMasterId != userId)
            {
                return StatusCode(HttpStatusCode.Forbidden);
            }

            dbContext.Games.Remove(game);
            await dbContext.SaveChangesAsync(cancellationToken);

            return Ok();
        }

        private async Task<bool> GetGameExistsAsync(CreateGameModel createModel, Guid? gameId, CancellationToken cancellationToken)
        {
            if (gameId.HasValue == true)
            {
                return await this.dbContext.Games.AnyAsync(g => g.Name == createModel.Name && g.Id != gameId.Value, cancellationToken);
            }
            else
            {
                return await this.dbContext.Games.AnyAsync(g => g.Name == createModel.Name, cancellationToken);
            }
        }
    }
}
