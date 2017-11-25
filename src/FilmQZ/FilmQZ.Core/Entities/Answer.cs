using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FilmQZ.Core.Entities
{
    public class Answer
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime CreatedDate { get; set; }

        [StringLength(280)]
        [Required]
        public string Value { get; set; }

        [ForeignKey("Question")]
        public Guid QuestionId { get; set; }

        //[ForeignKey("AnswerPoint")]
        //public Guid AnswerPointId { get; set; }

        [ForeignKey("Team")]
        public Guid TeamId { get; set; }

        public virtual Question Question{ get; set; }

        public virtual AnswerPoint AnswerPoint { get; set; }

        public virtual Team Team { get; set; }
    }
}
