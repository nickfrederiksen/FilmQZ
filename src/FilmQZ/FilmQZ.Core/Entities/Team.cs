using FilmQZ.Core.Entities.Relations;
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
        public Team()
        {
            this.Games = new HashSet<Game>();
            this.Users = new HashSet<UserTeam>();
        }
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Index(IsUnique =true)]
        [StringLength(20)]
        public string Name { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime CreatedDate { get; set; }

        [Required]
        [StringLength(128)]
        public string TeamOwnerId { get; set; }

        public virtual ICollection<Game> Games { get; set; }
        public virtual ICollection<UserTeam> Users{ get; set; }
    }
}
