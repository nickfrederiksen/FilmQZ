namespace FilmQZ.Core
{
    using FilmQZ.Core.Entities;
    using FilmQZ.Core.Entities.Relations;
    using FilmQZ.Core.Migrations;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    public class DatabaseContext : DbContext
    {
        // Your context has been configured to use a 'FilmQZDB' connection string from your application's 
        // configuration file (App.config or Web.config). By default, this connection string targets the 
        // 'FilmQZ.Core.Database' database on your LocalDb instance. 
        // 
        // If you wish to target a different database and/or database provider, modify the 'FilmQZDB' 
        // connection string in the application configuration file.
        public DatabaseContext()
            : base("name=FilmQZDB")
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<DatabaseContext, Configuration>());
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Question>().HasRequired(q => q.Point).WithRequiredDependent(d => d.Question).WillCascadeOnDelete(true);
            base.OnModelCreating(modelBuilder);
        }

        // Add a DbSet for each entity type that you want to include in your model. For more information 
        // on configuring and using a Code First model, see http://go.microsoft.com/fwlink/?LinkId=390109.

        // public virtual DbSet<MyEntity> MyEntities { get; set; }

        public virtual DbSet<Team> Teams { get; set; }
        public virtual DbSet<Game> Games { get; set; }
        public virtual DbSet<UserTeam> UserTeams { get; set; }
        public virtual DbSet<UserGame> UserGames { get; set; }


        public virtual DbSet<Answer> Answers { get; set; }
        public virtual DbSet<Question> Questions { get; set; }
        public virtual DbSet<Point> Points { get; set; }
        public virtual DbSet<Round> Rounds { get; set; }
        public virtual DbSet<AnswerPoint> AnswerPoints { get; set; }
    }
}