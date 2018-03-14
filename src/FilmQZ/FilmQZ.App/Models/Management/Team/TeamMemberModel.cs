using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FilmQZ.App.Models.Management.Team
{
	public class TeamMemberModel
	{
		public string UserId { get; internal set; }
		public string Name { get; internal set; }
		public DateTime CreatedDate { get; internal set; }
	}
}
