using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FilmQZ.Core.Entities
{
    public class UserProfile
	{

		[Key, Column(Order = 1)]
		[Required]
		[StringLength(128)]
		public string UserId { get; set; }

		[DatabaseGenerated(DatabaseGeneratedOption.Computed)]
		public DateTime CreatedDate { get; set; }

		[Required]
		public string FullName { get; set; }

		public string PhoneNumber { get; set; }

		public string Description { get; set; }
	}
}
