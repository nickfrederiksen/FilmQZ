using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FilmQZ.App.Models.Management.Team
{
    public class TeamListItemModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string URL { get; set; }
        public DateTime CreatedDate { get; set; }
        public string ManageUrl { get; set; }
    }
}
