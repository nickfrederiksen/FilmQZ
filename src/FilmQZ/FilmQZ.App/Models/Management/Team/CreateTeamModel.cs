using FilmQZ.App.BusinessLogic.Helpers;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FilmQZ.App.Models.Management.Team
{
    public class CreateTeamModel
    {
        [Required(AllowEmptyStrings = false)]
        [RegularExpression(URLHelpers.BaseStringRegex)]
        [StringLength(20)]
        public string Name { get; set; }
    }
}
