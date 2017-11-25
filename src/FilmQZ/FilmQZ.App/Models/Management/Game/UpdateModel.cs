using FilmQZ.App.BusinessLogic.Helpers;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FilmQZ.App.Models.Management.Game
{
    public class UpdateModel : CreateModel
    {
        [Required]
        public Guid Id { get; set; }
    }
}
