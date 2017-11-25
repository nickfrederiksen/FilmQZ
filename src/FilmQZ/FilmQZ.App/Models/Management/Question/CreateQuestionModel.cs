using FilmQZ.Core.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FilmQZ.App.Models.Management.Question
{
    public class CreateQuestionModel
    {
        [StringLength(280)]
        [Required]
        public string Text { get; set; }

        public QuestionType QuestionType { get; set; }

        public decimal Point { get; set; }
    }
}
