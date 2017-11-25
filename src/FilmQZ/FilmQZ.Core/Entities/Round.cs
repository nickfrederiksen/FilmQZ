using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FilmQZ.Core.Entities
{
    public class Round
    {
        public Round()
        {
            this.Questions = new HashSet<Question>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime CreatedDate { get; set; }

        [Index("UQ_Round", IsUnique =true, Order = 0)]
        [Required]
        [StringLength(250)]
        public string Name { get; set; }

        public string Description { get; set; }

        [ForeignKey("Game")]
        [Index("UQ_Round", IsUnique = true, Order = 1)]
        public Guid GameId { get; set; }

        public virtual Game Game { get; set; }

        public virtual ICollection<Question> Questions { get; set; }
    }
}
