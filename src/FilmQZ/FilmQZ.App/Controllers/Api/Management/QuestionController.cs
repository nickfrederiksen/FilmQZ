using FilmQZ.App.BusinessLogic.Interfaces;
using FilmQZ.App.Models.Management.Question;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Threading;
using FilmQZ.Core.Entities;
using FilmQZ.Core;
using System.Data.Entity;
using Microsoft.AspNet.Identity;
using System.Net;
using System.Web.Http.Description;

namespace FilmQZ.App.Controllers.Api.Management
{
    [RoutePrefix("api/management/game/{gameId:Guid}/rounds/{roundId:Guid}/questions")]
    public class QuestionController : ApiController, IRoundIdCrudController<UpdateQuestionModel, CreateQuestionModel>
    {
        private readonly DatabaseContext dbContext;

        public QuestionController(DatabaseContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]
        [Route("")]
        [ResponseType(typeof(QuestionEntityModel))]
        public async Task<IHttpActionResult> Create(Guid gameId, Guid roundId, CreateQuestionModel createModel, CancellationToken cancellationToken)
        {
            if (ModelState.IsValid)
            {
                var roundResult = await GetAndValidateGameAndRound(gameId, roundId, cancellationToken);
                if (roundResult.success == false)
                {
                    return roundResult.result;
                }

                if (await dbContext.Questions.AnyAsync(q => q.RoundId == roundId && q.Text == createModel.Text, cancellationToken))
                {
                    return Conflict();
                }

                var newQuestion = new Question()
                {
                    Point = new Point() { Value = createModel.Point },
                    Text = createModel.Text,
                    QuestionType = createModel.QuestionType
                };

                roundResult.round.Questions.Add(newQuestion);

                await dbContext.SaveChangesAsync(cancellationToken);
                QuestionEntityModel model = GetEntityModel(roundId, newQuestion);

                return Ok(model);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IHttpActionResult> Delete(Guid gameId, Guid roundId, Guid id, CancellationToken cancellationToken)
        {
            var roundResult = await GetAndValidateGameAndRound(gameId, roundId, cancellationToken);
            if (roundResult.success == false)
            {
                return roundResult.result;
            }

            var entity = await dbContext.Questions.SingleOrDefaultAsync(q => q.RoundId == roundId && q.Id == id, cancellationToken);
            if (entity == null)
            {
                return NotFound();
            }
            dbContext.Points.Remove(entity.Point);
            dbContext.Questions.Remove(entity);
            await dbContext.SaveChangesAsync(cancellationToken);

            return Ok();
        }

        [HttpGet]
        [Route("")]
        [ResponseType(typeof(IEnumerable<QuestionListItemModel>))]
        public async Task<IHttpActionResult> GetAll(Guid gameId, Guid roundId, CancellationToken cancellationToken)
        {
            var roundResult = await GetAndValidateGameAndRound(gameId, roundId, cancellationToken);
            if (roundResult.success == false)
            {
                return roundResult.result;
            }

            var questions = from q in dbContext.Questions
                            join p in dbContext.Points on q.Point equals p into xJoinP
                            from p in xJoinP.DefaultIfEmpty()
                            where q.RoundId == roundId
                            select new QuestionListItemModel()
                            {
                                CreatedDate = q.CreatedDate,
                                Id = q.Id,
                                Text = q.Text,
                                Point = p == null ? 0 : p.Value,
                                QuestionType = q.QuestionType
                            };

            var result = await questions.ToListAsync(cancellationToken);

            return Ok(result);
        }

        [HttpGet]
        [Route("{id:Guid}", Name = "manageQuestionId")]
        [ResponseType(typeof(QuestionEntityModel))]
        public async Task<IHttpActionResult> GetSingle(Guid gameId, Guid roundId, Guid id, CancellationToken cancellationToken)
        {
            var roundResult = await GetAndValidateGameAndRound(gameId, roundId, cancellationToken);
            if (roundResult.success == false)
            {
                return roundResult.result;
            }

            var query = from q in dbContext.Questions
                        join p in dbContext.Points on q.Point equals p into xJoinP
                        from p in xJoinP.DefaultIfEmpty()
                        where q.RoundId == roundId && q.Id == id
                        select q;
            var entity = await query.SingleOrDefaultAsync(cancellationToken);

            if (entity == null)
            {
                return NotFound();
            }

            var model = GetEntityModel(roundId, entity);

            return Ok(model);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IHttpActionResult> Update(Guid gameId, Guid roundId, Guid id, UpdateQuestionModel model, CancellationToken cancellationToken)
        {
            if (ModelState.IsValid)
            {
                var roundResult = await GetAndValidateGameAndRound(gameId, roundId, cancellationToken);
                if (roundResult.success == false)
                {
                    return roundResult.result;
                }

                if (await dbContext.Questions.AnyAsync(r => r.RoundId == roundId && r.Text == model.Text && r.Id != id, cancellationToken))
                {
                    return Conflict();
                }

                var query = from q in dbContext.Questions
                            where q.RoundId == roundId && q.Id == id
                            select q;

                var entity = await query.SingleOrDefaultAsync(cancellationToken);

                if (entity == null)
                {
                    return NotFound();
                }

                entity.Text = model.Text;
                entity.QuestionType = model.QuestionType;
                if (entity.Point == null)
                {
                    entity.Point = new Point();
                }

                entity.Point.Value = model.Point;

                await dbContext.SaveChangesAsync(cancellationToken);

                return Ok();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        private async Task<(bool success, Game game, Round round, IHttpActionResult result)> GetAndValidateGameAndRound(Guid gameId, Guid roundId, CancellationToken cancellationToken)
        {
            IHttpActionResult result = null;
            var success = false;

            var game = await dbContext.Games.SingleOrDefaultAsync(g => g.Id == gameId, cancellationToken);
            Round round = null;

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
                round = await dbContext.Rounds.SingleOrDefaultAsync(r => r.Id == roundId && r.GameId == gameId, cancellationToken);
                if (round == null)
                {
                    result = NotFound();
                }
                else
                {
                    success = true;
                }
            }

            return (success, game, round, result);
        }

        private QuestionEntityModel GetEntityModel(Guid roundId, Question question)
        {
            return new QuestionEntityModel()
            {
                CreatedDate = question.CreatedDate,
                Text = question.Text,
                Id = question.Id,
                Point = question.Point.Value,
                QuestionType = question.QuestionType
            };
        }
    }
}
