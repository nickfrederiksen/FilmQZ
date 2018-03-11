using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FilmQZ.App.Models.Play
{
    public class GameListModel
    {
		public string Url { get; set; }
		public string Name { get; set; }
		public bool IsOpen { get; internal set; }
	}
}
