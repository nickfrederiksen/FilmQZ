using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FilmQZ.Core.Entities.Relations
{
    public class UserTeam
    {
        [Key, Column(Order =0)]
        public Guid TeamId { get; set; }

        [Key, Column(Order = 1)]
        [Required]
        [StringLength(128)]
        public string UserId { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime CreatedDate { get; set; }

        [ForeignKey("TeamId")]
        public virtual Team Team { get; set; }
    }
}
