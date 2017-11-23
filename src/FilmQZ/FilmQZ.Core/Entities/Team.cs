using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FilmQZ.Core.Entities
{
    public class Team
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Key { get; set; }

        public string Name { get; set; }

        [Required]
        [StringLength(128)]
        public string TeamOwnerId { get; set; }

        public virtual ICollection<Game> Games { get; set; }
    }
}
