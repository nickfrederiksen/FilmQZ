using FilmQZ.App.BusinessLogic.Interfaces;
using FilmQZ.App.Models.Management.Round;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Threading;
using FilmQZ.Core;
using Microsoft.AspNet.Identity;
using System.Net;
using System.Data.Entity;
using FilmQZ.Core.Entities;
using System.Web.Http.Description;

namespace FilmQZ.App.Controllers.Api.Management
{
    [RoutePrefix("api/management/game/{gameId:Guid}/rounds")]
    public class RoundController : ApiController, IGameIdCrudController<UpdateRoundModel, CreateRoundModel>
    {
        private readonly DatabaseContext dbContext;

        public RoundController(DatabaseContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]
        [Route("")]
        [ResponseType(typeof(RoundEntityModel))]
        public async Task<IHttpActionResult> Create(Guid gameId, CreateRoundModel createModel, CancellationToken cancellationToken)
        {
            var gameResult = await this.GetAndValidateGame(gameId, cancellationToken);
            if (gameResult.success == false)
            {
                return gameResult.result;
            }

            var game = gameResult.game;
            if (await this.dbContext.Rounds.AnyAsync(r => r.GameId == gameId && r.Name == createModel.Name, cancellationToken))
            {
                return Conflict();
            }

            var newRound = new Round()
            {
                Name = createModel.Name,
                Description = createModel.Description
            };

            game.Rounds.Add(newRound);

            await dbContext.SaveChangesAsync(cancellationToken);

            RoundEntityModel model = GetEntityModel(gameId, newRound);

            return Ok(model);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IHttpActionResult> Delete(Guid gameId, Guid id, CancellationToken cancellationToken)
        {
            var gameResult = await this.GetAndValidateGame(gameId, cancellationToken);
            if (gameResult.success == false)
            {
                return gameResult.result;
            }

            var round = await dbContext.Rounds.SingleOrDefaultAsync(r => r.GameId == gameId && r.Id == id, cancellationToken);
            if (round == null)
            {
                return NotFound();
            }

            dbContext.Rounds.Remove(round);
            await dbContext.SaveChangesAsync(cancellationToken);

            return Ok();
        }

        [HttpGet]
        [Route("")]
        [ResponseType(typeof(IEnumerable<RoundListItemModel>))]
        public async Task<IHttpActionResult> GetAll(Guid gameId, CancellationToken cancellationToken)
        {
            var gameResult = await this.GetAndValidateGame(gameId, cancellationToken);
            if (gameResult.success == false)
            {
                return gameResult.result;
            }

            var rounds = from r in dbContext.Rounds
                         where r.GameId == gameId
                         select new RoundListItemModel()
                         {
                             CreatedDate = r.CreatedDate,
                             Description = r.Description,
                             GameId = r.GameId,
                             Id = r.Id,
                             Name = r.Name
                         };

            var result = await rounds.ToListAsync(cancellationToken);
            foreach (var item in result)
            {
                item.ManageUrl = Url.Link("manageRoundId", new { id = item.Id });
            }

            return Ok(result);
        }

        [HttpGet]
        [Route("{id:Guid}", Name = "manageRoundId")]
        [ResponseType(typeof(RoundEntityModel))]
        public async Task<IHttpActionResult> GetSingle(Guid gameId, Guid id, CancellationToken cancellationToken)
        {
            var gameResult = await this.GetAndValidateGame(gameId, cancellationToken);
            if (gameResult.success == false)
            {
                return gameResult.result;
            }

            var round = await dbContext.Rounds.SingleOrDefaultAsync(r => r.Id == id && r.GameId == gameId, cancellationToken);
            if (round == null)
            {
                return NotFound();
            }

            var model = GetEntityModel(gameId, round);

            return Ok(model);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IHttpActionResult> Update(Guid gameId, Guid id, UpdateRoundModel model, CancellationToken cancellationToken)
        {
            var gameResult = await this.GetAndValidateGame(gameId, cancellationToken);
            if (gameResult.success == false)
            {
                return gameResult.result;
            }

            var round = await dbContext.Rounds.SingleOrDefaultAsync(r => r.Id == id && r.GameId == gameId, cancellationToken);
            if (round == null)
            {
                return NotFound();
            }
            else if (await dbContext.Rounds.AnyAsync(r => r.GameId == gameId && r.Name == model.Name && r.Id != id, cancellationToken))
            {
                return Conflict();
            }

            round.Description = model.Description;
            round.Name = model.Name;

            await dbContext.SaveChangesAsync(cancellationToken);
            return Ok();
        }

        private async Task<(bool success, Game game, IHttpActionResult result)> GetAndValidateGame(Guid gameId, CancellationToken cancellationToken)
        {
            IHttpActionResult result = null;
            var success = false;

            var game = await dbContext.Games.SingleOrDefaultAsync(g => g.Id == gameId, cancellationToken);
            var userId = User.Identity.GetUserId();
            if (game == null)
            {
                result = NotFound();
            }
            else if (game.GameMasterId != userId)
            {
                result = StatusCode(HttpStatusCode.Forbidden);
            }
            else
            {
                success = true;
            }

            return (success, game, result);
        }

        private RoundEntityModel GetEntityModel(Guid gameId, Round round)
        {
            var manageUrl = Url.Link("manageRoundId", new { id = round.Id });
            var gameManageUrl = Url.Link("manageGameId", new { id = gameId });
            var model = new RoundEntityModel()
            {
                CreatedDate = round.CreatedDate,
                Id = round.Id,
                ManageUrl = manageUrl,
                Name = round.Name,
                Description = round.Description,
                GameId = gameId,
                GameManageUrl = gameManageUrl
            };
            return model;
        }
    }
}
