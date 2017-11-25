using FilmQZ.App.BusinessLogic.Helpers;
using FilmQZ.App.BusinessLogic.Interfaces;
using FilmQZ.App.Models.Management.Team;
using FilmQZ.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Threading;
using FilmQZ.App.App_Start;
using FilmQZ.App.Authentication.Constants;
using Microsoft.AspNet.Identity;
using System.Data.Entity;
using System.Net;
using FilmQZ.Core.Entities;
using FilmQZ.Core.Extensions;
using System.Web.Http.Description;
using FilmQZ.Core.Logging;

namespace FilmQZ.App.Controllers.Api.Management
{
    [RoutePrefix("api/management/team")]
    public class TeamController : ApiController, ICrudController<UpdateTeamModel, CreateTeamModel>
    {
        private readonly DatabaseContext dbContext;
        private readonly URLHelpers urlHelpers;
        private readonly LogHelper logHelper;

        public TeamController(DatabaseContext dbContext, URLHelpers urlHelpers, LogHelper logHelper)
        {
            this.dbContext = dbContext;
            this.urlHelpers = urlHelpers;
            this.logHelper = logHelper;
        }

        [Route("")]
        [HttpPost]
        [ResponseType(typeof(TeamEntityModel))]
        public async Task<IHttpActionResult> Create(CreateTeamModel createModel, CancellationToken cancellationToken)
        {
            if (ModelState.IsValid)
            {
                if (await GetTeamExistsAsync(createModel, null, cancellationToken))
                {
                    return Conflict();
                }
                else
                {
                    var userId = User.Identity.GetUserId();
                    var teamUrl = this.urlHelpers.GenerateCleanURL(createModel.Name);
                    var newTeam = new Team()
                    {
                        TeamOwnerId = userId,
                        Name = createModel.Name,
                        URL = teamUrl
                    };

                    newTeam.AddUser(userId);

                    this.dbContext.Teams.Add(newTeam);

                    await this.dbContext.SaveChangesAsync(cancellationToken);

                    var manageUrl = Url.Link("manageTeamId", new { id = newTeam.Id });
                    var model = new TeamEntityModel()
                    {
                        CreatedDate = newTeam.CreatedDate,
                        Id = newTeam.Id,
                        ManageUrl = manageUrl,
                        Name = newTeam.Name,
                        URL = newTeam.URL
                    };


                    return Ok(model);
                }
            }
            return BadRequest(ModelState);
        }

        [Route("{id:Guid}")]
        [HttpDelete]
        public async Task<IHttpActionResult> Delete(Guid id, CancellationToken cancellationToken)
        {
            var userId = User.Identity.GetUserId();
            var team = await dbContext.Teams.SingleOrDefaultAsync(g => g.Id == id, cancellationToken);
            if (team == null)
            {
                return NotFound();
            }
            else if (team.TeamOwnerId != userId)
            {
                return StatusCode(HttpStatusCode.Forbidden);
            }

            dbContext.Teams.Remove(team);
            await dbContext.SaveChangesAsync(cancellationToken);

            return Ok();
        }

        [Route("")]
        [HttpGet]
        [ResponseType(typeof(IEnumerable<TeamListItemModel>))]
        public async Task<IHttpActionResult> GetAll(CancellationToken cancellationToken)
        {
            var userId = User.Identity.GetUserId();
            var teams = from t in dbContext.Teams
                        where t.TeamOwnerId == userId
                        select new TeamListItemModel()
                        {
                            CreatedDate = t.CreatedDate,
                            Id = t.Id,
                            Name = t.Name,
                            URL = t.URL
                        };

            var listItems = await teams.ToListAsync(cancellationToken);
            foreach (var item in listItems)
            {
                item.ManageUrl = Url.Link("manageTeamId", new { id = item.Id });
            }
            return base.Ok(listItems);
        }

        [Route("{id:Guid}", Name = "manageTeamId")]
        [HttpGet]
        [ResponseType(typeof(TeamEntityModel))]
        public async Task<IHttpActionResult> GetSingle(Guid id, CancellationToken cancellationToken)
        {
            var userId = User.Identity.GetUserId();
            var teams = from t in dbContext.Teams
                        where t.Id == id
                        select new
                        {
                            Id = t.Id,
                            Name = t.Name,
                            URL = t.URL,
                            CreatedDate = t.CreatedDate,
                            TeamOwnerId = t.TeamOwnerId
                        };

            var result = await teams.SingleOrDefaultAsync(cancellationToken);
            if (result == null)
            {
                return NotFound();
            }
            else if (result.TeamOwnerId != userId)
            {
                return StatusCode(HttpStatusCode.Forbidden);
            }

            var model = new TeamEntityModel()
            {
                Id = result.Id,
                CreatedDate = result.CreatedDate,
                Name = result.Name,
                URL = result.URL,
                ManageUrl = Url.Link("manageTeamId", new { id = result.Id })
            };

            return Ok(model);
        }

        [Route("{id:Guid}")]
        [HttpPut]
        public async Task<IHttpActionResult> Update(Guid id, UpdateTeamModel model, CancellationToken cancellationToken)
        {
            if (ModelState.IsValid)
            {
                var entity = await dbContext.Teams.SingleOrDefaultAsync(g => g.Id == id, cancellationToken);
                if (entity == null)
                {
                    return NotFound();
                }
                else
                {
                    var userId = User.Identity.GetUserId();
                    if (entity.TeamOwnerId != userId)
                    {
                        return StatusCode(HttpStatusCode.Forbidden);
                    }
                    if (await GetTeamExistsAsync(model, id, cancellationToken))
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

        private async Task<bool> GetTeamExistsAsync(CreateTeamModel createModel, Guid? teamId, CancellationToken cancellationToken)
        {
            if (teamId.HasValue == true)
            {
                return await this.dbContext.Teams.AnyAsync(g => g.Name == createModel.Name && g.Id != teamId, cancellationToken);
            }
            else
            {
                return await this.dbContext.Teams.AnyAsync(g => g.Name == createModel.Name, cancellationToken);
            }
        }
    }
}
