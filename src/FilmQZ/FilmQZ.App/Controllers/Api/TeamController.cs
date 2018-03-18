using FilmQZ.App.BusinessLogic.Helpers;
using FilmQZ.App.Models.Teams;
using FilmQZ.Core;
using FilmQZ.Core.Extensions;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;

namespace FilmQZ.App.Controllers.Api
{
	[RoutePrefix("api/teams")]
	public class TeamController : ApiController
    {
		private readonly DatabaseContext dbContext;
		private readonly URLHelpers urlHelpers;

		public TeamController(DatabaseContext dbContext, URLHelpers urlHelpers)
		{
			this.dbContext = dbContext;
			this.urlHelpers = urlHelpers;
		}

		[HttpGet]
		[Route("")]
		public async Task<IHttpActionResult> GetAll(CancellationToken cancellationToken)
		{
			var userId = User.Identity.GetUserId();
			var teams = from t in dbContext.Teams
						select new TeamItem()
						{
							Name = t.Name,
							URL = t.URL
						};

			var listItems = await teams.ToListAsync(cancellationToken);
			return Ok(listItems);
		}

		[Route("{teamUrl}")]
		[HttpGet]
		public async Task<IHttpActionResult> GetSingle(string teamUrl, CancellationToken cancellationToken)
		{
			var userId = User.Identity.GetUserId();
			var team = await dbContext.Teams.SingleOrDefaultAsync(t => t.URL == teamUrl, cancellationToken);
			if (team == null)
			{
				return NotFound();
			}

			var model = new TeamProfileModel()
			{
				CreatedDate = team.CreatedDate,
				Name = team.Name,
				URL = team.URL
			};

			return Ok(model);
		}

		[Route("{teamUrl}/subscribe")]
		[HttpPost]
		public async Task<IHttpActionResult> Subscribe(string teamUrl, CancellationToken cancellationToken)
		{
			var userId = User.Identity.GetUserId();

			var teamQuery = from t in this.dbContext.Teams
							where t.URL == teamUrl
							select t;

			var team = await teamQuery.SingleOrDefaultAsync(cancellationToken);
			if (team == null)
			{
				return NotFound();
			}

			var validateQuery = from s in teamQuery
								where s.TeamOwnerId == userId || s.Users.Any(u => u.UserId == userId)
								select s.Id;

			if (await validateQuery.AnyAsync(cancellationToken))
			{
				return Conflict();
			}
			else
			{
				team.AddUser(userId);
				await this.dbContext.SaveChangesAsync(cancellationToken);
			}

			return Ok();
		}

		[Route("{teamUrl}/unsubscribe")]
		[HttpDelete]
		public async Task<IHttpActionResult> Unsubscribe(string teamUrl, CancellationToken cancellationToken)
		{
			var userId = User.Identity.GetUserId();

			var isOwner = await this.dbContext.Teams.AnyAsync(t => t.URL == teamUrl && t.TeamOwnerId == userId, cancellationToken);
			if (isOwner)
			{
				return StatusCode(HttpStatusCode.Forbidden);
			}

			var teamSubscription = await dbContext.UserTeams.SingleOrDefaultAsync(ut => ut.UserId == userId && ut.Team.URL == teamUrl, cancellationToken);

			if (teamSubscription == null)
			{
				return NotFound();
			}

			dbContext.UserTeams.Remove(teamSubscription);
			await dbContext.SaveChangesAsync(cancellationToken);

			return Ok();
		}
	}
}
