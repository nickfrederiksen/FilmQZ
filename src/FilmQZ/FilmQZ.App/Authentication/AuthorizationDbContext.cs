using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FilmQZ.App.Authentication
{
    public class AuthorizationDbContext : IdentityDbContext<ApplicationUser>
    {
        public AuthorizationDbContext()
            : base("FilmQZDB", throwIfV1Schema: false)
        {
        }

        public static AuthorizationDbContext Create()
        {
            return new AuthorizationDbContext();
        }
    }
}
