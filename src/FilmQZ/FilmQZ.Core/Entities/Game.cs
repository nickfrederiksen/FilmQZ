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
    public class Game
    {
        public Game()
        {
            this.Teams = new HashSet<Team>();
            this.Users = new HashSet<UserGame>();
        }
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Required]
        [Index(IsUnique = true)]
        [StringLength(20)]
        public string Name { get; set; }

        [Required]
        [Index(IsUnique = true)]
        [StringLength(20)]
        public string URL { get; set; }

        public bool IsOpen { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime CreatedDate { get; set; }

        [Required]
        [StringLength(128)]
        public string GameMasterId { get; set; }

        public virtual ICollection<Team> Teams { get; set; }

        public virtual ICollection<UserGame> Users { get; set; }

    }
}
