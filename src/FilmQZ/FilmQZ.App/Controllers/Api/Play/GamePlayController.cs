using FilmQZ.App.BusinessLogic.Helpers;
using FilmQZ.App.Models.Play;
using FilmQZ.Core;
using FilmQZ.Core.Logging;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace FilmQZ.App.Controllers.Api.Play
{
	[RoutePrefix("api/play/game")]
	public class GamePlayController : ApiController
	{
		private readonly DatabaseContext dbContext;
		private readonly URLHelpers urlHelpers;
		private readonly LogHelper logHelper;

		public GamePlayController(DatabaseContext dbContext, URLHelpers urlHelpers, LogHelper logHelper)
		{
			this.dbContext = dbContext;
			this.urlHelpers = urlHelpers;
			this.logHelper = logHelper;
		}

		[Route("as/player")]
		[HttpGet]
		[ResponseType(typeof(IEnumerable<GameListModel>))]
		public async Task<IHttpActionResult> GetAllAsPlayer(CancellationToken cancellationToken)
		{
			var userId = User.Identity.GetUserId();

			var gamesQuery = from g in this.dbContext.Games
							 where g.Teams.Any(t => t.Users.Any(u => u.UserId == userId))
							 select new GameListModel()
							 {
								 Name = g.Name,
								 IsOpen = g.IsOpen,
								 Url = g.URL
							 };

			var games = await gamesQuery.ToListAsync(cancellationToken).ConfigureAwait(false);

			return Ok(games);
		}

		[Route("as/gamemaster")]
		[HttpGet]
		[ResponseType(typeof(IEnumerable<GameListModel>))]
		public async Task<IHttpActionResult> GetAllAsGameMaster(CancellationToken cancellationToken)
		{
			var userId = User.Identity.GetUserId();

			var gamesQuery = from g in this.dbContext.Games
							 where g.GameMasterId == userId
							 select new GameListModel()
							 {
								 Name = g.Name,
								 IsOpen = g.IsOpen,
								 Url = g.URL
							 };

			var games = await gamesQuery.ToListAsync(cancellationToken).ConfigureAwait(false);

			return Ok(games);
		}
	}
}
