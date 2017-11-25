using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FilmQZ.App.Models.Management.Game
{
    public class ListItem
    {
        public Guid Id { get; internal set; }
        public bool IsOpen { get; internal set; }
        public string Name { get; internal set; }
        public string URL { get; internal set; }
        public DateTime CreatedDate { get; internal set; }
    }
}
