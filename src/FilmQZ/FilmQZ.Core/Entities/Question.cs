using FilmQZ.Core.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FilmQZ.Core.Entities
{
    public class Question
    {
        public Question()
        {
            this.Answers = new HashSet<Answer>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime CreatedDate { get; set; }

        [Index("UQ_Question", IsUnique =true, Order =0)]
        [StringLength(280)]
        [Required]
        public string Text { get; set; }

        [ForeignKey("Round")]
        [Index("UQ_Question", IsUnique = true, Order = 1)]
        public Guid RoundId { get; set; }


        public QuestionType QuestionType { get; set; }

        public virtual Point Point { get; set; }

        public virtual Round Round { get; set; }

        public virtual ICollection<Answer> Answers { get; set; }

    }
}
