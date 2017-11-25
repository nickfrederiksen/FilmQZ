using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FilmQZ.Core.Entities
{
    public class Point
    {
        public Point()
        {
            this.AnswerPoints = new HashSet<AnswerPoint>();
        }

        [ForeignKey("Question")]
        [Key]
        public Guid QuestionId { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime CreatedDate { get; set; }

        [Required]
        public decimal Value { get; set; }
        

        public virtual Question Question { get; set; }

        public virtual ICollection<AnswerPoint> AnswerPoints { get; set; }
    }
}
