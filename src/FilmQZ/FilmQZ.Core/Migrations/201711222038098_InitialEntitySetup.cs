namespace FilmQZ.Core.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialEntitySetup : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Games",
                c => new
                {
                    Key = c.Guid(nullable: false, identity: true),
                    Name = c.String(),
                    IsOpen = c.Boolean(nullable: false),
                    GameMasterId = c.String(nullable: false, maxLength: 128),
                })
                .PrimaryKey(t => t.Key);

            CreateTable(
                "dbo.Teams",
                c => new
                {
                    Key = c.Guid(nullable: false, identity: true),
                    Name = c.String(),
                    TeamOwnerId = c.String(nullable: false, maxLength: 128),
                })
                .PrimaryKey(t => t.Key);

            CreateTable(
                "dbo.UserGames",
                c => new
                    {
                        GameId = c.Guid(nullable: false),
                        UserId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.GameId, t.UserId })
                .ForeignKey("dbo.Games", t => t.GameId, cascadeDelete: true)
                .Index(t => t.GameId);

            CreateTable(
                "dbo.UserTeams",
                c => new
                    {
                        TeamId = c.Guid(nullable: false),
                        UserId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.TeamId, t.UserId })
                .ForeignKey("dbo.Teams", t => t.TeamId, cascadeDelete: true)
                .Index(t => t.TeamId);

            CreateTable(
                "dbo.TeamGames",
                c => new
                    {
                        Team_Key = c.Guid(nullable: false),
                        Game_Key = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => new { t.Team_Key, t.Game_Key })
                .ForeignKey("dbo.Teams", t => t.Team_Key, cascadeDelete: true)
                .ForeignKey("dbo.Games", t => t.Game_Key, cascadeDelete: true)
                .Index(t => t.Team_Key)
                .Index(t => t.Game_Key);

            AddForeignKey("dbo.Games", "GameMasterId", "dbo.AspNetUsers", "Id", cascadeDelete: false);
            AddForeignKey("dbo.Teams", "TeamOwnerId", "dbo.AspNetUsers", "Id", cascadeDelete: false);
            AddForeignKey("dbo.UserGames", "UserId", "dbo.AspNetUsers", "Id", cascadeDelete: false);
            AddForeignKey("dbo.UserTeams", "UserId", "dbo.AspNetUsers", "Id", cascadeDelete: false);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Games", "GameMasterId", "dbo.AspNetUsers");
            DropForeignKey("dbo.Teams", "TeamOwnerId", "dbo.AspNetUsers");
            DropForeignKey("dbo.UserGames", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.UserTeams", "UserId", "dbo.AspNetUsers");

            DropForeignKey("dbo.UserTeams", "TeamId", "dbo.Teams");
            DropForeignKey("dbo.UserGames", "GameId", "dbo.Games");
            DropForeignKey("dbo.TeamGames", "Game_Key", "dbo.Games");
            DropForeignKey("dbo.TeamGames", "Team_Key", "dbo.Teams");
            DropIndex("dbo.TeamGames", new[] { "Game_Key" });
            DropIndex("dbo.TeamGames", new[] { "Team_Key" });
            DropIndex("dbo.UserTeams", new[] { "TeamId" });
            DropIndex("dbo.UserGames", new[] { "GameId" });
            DropTable("dbo.TeamGames");
            DropTable("dbo.UserTeams");
            DropTable("dbo.UserGames");
            DropTable("dbo.Teams");
            DropTable("dbo.Games");
        }
    }
}
