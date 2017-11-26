using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FilmQZ.Core.Enums;

namespace FilmQZ.App.Models.Management.Question
{
    public class QuestionListItemModel
    {
        public Guid Id { get; set; }
        public DateTime CreatedDate { get; set; }

        public string Text { get; set; }

        public decimal Point { get; set; }
        public QuestionType QuestionType { get; internal set; }
    }
}
