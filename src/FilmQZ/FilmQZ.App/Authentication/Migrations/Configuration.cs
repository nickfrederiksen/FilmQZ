namespace FilmQZ.App.Authentication.Migrations
{
    using FilmQZ.App.Authentication.Constants;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<FilmQZ.App.Authentication.AuthorizationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true;
            MigrationsDirectory = @"Authentication\Migrations";
        }

        protected override void Seed(FilmQZ.App.Authentication.AuthorizationDbContext context)
        {
            //  This method will be called after migrating to the latest version.
            var systemAdmin = new IdentityRole(UserRoles.SystemAdministrator);

            context.Roles.AddOrUpdate(i => i.Name, systemAdmin);
        }
    }
}
