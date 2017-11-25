using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FilmQZ.App.Models.Management.Team
{
    public class TeamListItemModel
    {
        public Guid Id { get; internal set; }
        public string Name { get; internal set; }
        public string URL { get; internal set; }
        public DateTime CreatedDate { get; internal set; }
        public string ManageUrl { get; set; }
    }
}
