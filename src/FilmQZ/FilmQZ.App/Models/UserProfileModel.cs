using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FilmQZ.App.Models
{
    public class UserProfileModel
	{
		[Required]
		public string FullName { get; set; }

		[DataType(DataType.PhoneNumber)]
		public string PhoneNumber { get; set; }

		[DataType(DataType.Html)]
		public string Description { get; set; }
	}
}
