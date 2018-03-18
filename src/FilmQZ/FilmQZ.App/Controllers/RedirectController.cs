using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace FilmQZ.App.Controllers
{
	[AllowAnonymous]
	public class RedirectController : Controller
	{
		public RedirectResult RedirectTeam(string teamUrl)
		{
			return Redirect($"/#!/teams/{teamUrl}");
		}
	}
}
