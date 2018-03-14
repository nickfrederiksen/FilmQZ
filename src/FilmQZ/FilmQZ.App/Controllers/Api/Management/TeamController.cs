﻿using FilmQZ.App.BusinessLogic.Helpers;
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
using FilmQZ.App.BusinessLogic.Enums;

namespace FilmQZ.App.Controllers.Api.Management
{
	[RoutePrefix("api/management/teams")]
	public class TeamController : ApiController
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

					var model = new TeamEntityModel()
					{
						CreatedDate = newTeam.CreatedDate,
						Id = newTeam.Id,
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
		[Route("{id:Guid}/unsubscribe")]
		[HttpDelete]
		public async Task<IHttpActionResult> UnSubscribe(Guid id, CancellationToken cancellationToken)
		{
			var userId = User.Identity.GetUserId();
			var teamSubscription = await dbContext.UserTeams.SingleOrDefaultAsync(ut => ut.UserId == userId && ut.TeamId == id);

			if (teamSubscription == null)
			{
				return NotFound();
			}

			dbContext.UserTeams.Remove(teamSubscription);
			await dbContext.SaveChangesAsync(cancellationToken);

			return Ok();
		}


		[Route("{filter}")]
		[HttpGet]
		[ResponseType(typeof(IEnumerable<TeamListItemModel>))]
		public async Task<IHttpActionResult> GetAll(TeamFilter filter, CancellationToken cancellationToken)
		{
			IEnumerable<TeamListItemModel> listItems;
			if (filter == TeamFilter.Membership)
			{
				listItems = await GetMemberOf(cancellationToken);
			}
			else if (filter == TeamFilter.Owner)
			{
				listItems = await GetOwnerOf(cancellationToken);
			}
			else if (filter == TeamFilter.NotRelated)
			{
				listItems = await GetNotRelatedTo(cancellationToken);
			}
			else
			{
				listItems = await GetAll(cancellationToken);
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
				URL = result.URL
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

		private async Task<IEnumerable<TeamListItemModel>> GetMemberOf(CancellationToken cancellationToken)
		{
			var userId = User.Identity.GetUserId();
			var teams = from t in dbContext.Teams
						where t.TeamOwnerId != userId && t.Users.Any(u => u.UserId == userId)
						select new TeamListItemModel()
						{
							CreatedDate = t.CreatedDate,
							Id = t.Id,
							Name = t.Name,
							URL = t.URL
						};

			var listItems = await teams.ToListAsync(cancellationToken);
			return listItems;
		}

		private async Task<IEnumerable<TeamListItemModel>> GetOwnerOf(CancellationToken cancellationToken)
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
			return listItems;
		}

		private async Task<IEnumerable<TeamListItemModel>> GetAll(CancellationToken cancellationToken)
		{
			var teams = from t in dbContext.Teams
						select new TeamListItemModel()
						{
							CreatedDate = t.CreatedDate,
							Id = t.Id,
							Name = t.Name,
							URL = t.URL
						};

			var listItems = await teams.ToListAsync(cancellationToken);
			return listItems;
		}

		private async Task<IEnumerable<TeamListItemModel>> GetNotRelatedTo(CancellationToken cancellationToken)
		{
			var userId = User.Identity.GetUserId();

			var teams = from t in dbContext.Teams
						where t.TeamOwnerId != userId && t.Users.Any(u => u.UserId == userId) == false
						select new TeamListItemModel()
						{
							CreatedDate = t.CreatedDate,
							Id = t.Id,
							Name = t.Name,
							URL = t.URL
						};

			var listItems = await teams.ToListAsync(cancellationToken);
			return listItems;
		}
	}
}
