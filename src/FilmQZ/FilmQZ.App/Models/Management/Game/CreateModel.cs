using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FilmQZ.App.Models.Management.Game
{
    public class CreateModel
    {
        [Required(AllowEmptyStrings = false)]
        public string Name { get; set; }
    }
}
