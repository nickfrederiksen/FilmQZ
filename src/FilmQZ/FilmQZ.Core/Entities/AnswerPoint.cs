using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FilmQZ.Core.Entities
{
    public class AnswerPoint
    {

        [ForeignKey("Answer")]
        [Key]
        public Guid AnswerId { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime CreatedDate { get; set; }

        [ForeignKey("Point")]
        public Guid PointId { get; set; }

        public virtual Point Point { get; set; }

        public virtual Answer Answer { get; set; }


    }
}
