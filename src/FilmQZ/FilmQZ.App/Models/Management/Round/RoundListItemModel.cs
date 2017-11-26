using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FilmQZ.App.Models.Management.Round
{
    public class RoundListItemModel
    {
        public Guid Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid GameId { get; set; }
    }
}
