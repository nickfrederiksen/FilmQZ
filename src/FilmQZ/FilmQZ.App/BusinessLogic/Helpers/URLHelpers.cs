using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace FilmQZ.App.BusinessLogic.Helpers
{
    public class URLHelpers
    {
        public const string BaseStringRegex = @"(?!^( |-|\.)+$)^(\w| |\.|\d|-|æ|ø|å)+$$";
        private readonly Regex BaseStringValidationRegex = new Regex(BaseStringRegex, RegexOptions.IgnoreCase);


        public string GenerateCleanURL(string baseString)
        {
            if (BaseStringValidationRegex.IsMatch(baseString)== false)
            {
                throw new ArgumentException("Base string not in correct format!");
            }

            var urlString = baseString
                .Replace(" - ", "-")
                .Replace(" . ", "-")
                .Replace(".", "-")
                .Replace(" ", "-").ToLower();

            return urlString;
        }
    }
}
