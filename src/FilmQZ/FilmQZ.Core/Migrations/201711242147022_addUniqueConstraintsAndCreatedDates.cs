namespace FilmQZ.Core.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addUniqueConstraintsAndCreatedDates : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.TeamGames", "Game_Key", "dbo.Games");
            DropForeignKey("dbo.UserGames", "GameId", "dbo.Games");
            DropForeignKey("dbo.TeamGames", "Team_Key", "dbo.Teams");
            DropForeignKey("dbo.UserTeams", "TeamId", "dbo.Teams");
            RenameColumn(table: "dbo.TeamGames", name: "Team_Key", newName: "Team_Id");
            RenameColumn(table: "dbo.TeamGames", name: "Game_Key", newName: "Game_Id");
            RenameIndex(table: "dbo.TeamGames", name: "IX_Team_Key", newName: "IX_Team_Id");
            RenameIndex(table: "dbo.TeamGames", name: "IX_Game_Key", newName: "IX_Game_Id");
            DropPrimaryKey("dbo.Games");
            DropPrimaryKey("dbo.Teams");
            AddColumn("dbo.Games", "Id", c => c.Guid(nullable: false, identity: true, defaultValueSql:"NEWSEQUENTIALID()"));
            AddColumn("dbo.Games", "URL", c => c.String(nullable: false, maxLength: 20));
            AddColumn("dbo.Games", "CreatedDate", c => c.DateTime(nullable: false, defaultValueSql: "GETDATE()"));
            AddColumn("dbo.Teams", "Id", c => c.Guid(nullable: false, identity: true, defaultValueSql: "NEWSEQUENTIALID()"));
            AddColumn("dbo.Teams", "CreatedDate", c => c.DateTime(nullable: false, defaultValueSql: "GETDATE()"));
            AddColumn("dbo.UserGames", "CreatedDate", c => c.DateTime(nullable: false, defaultValueSql: "GETDATE()"));
            AddColumn("dbo.UserTeams", "CreatedDate", c => c.DateTime(nullable: false, defaultValueSql: "GETDATE()"));
            AlterColumn("dbo.Games", "Name", c => c.String(maxLength: 20));
            AlterColumn("dbo.Teams", "Name", c => c.String(maxLength: 20));
            AddPrimaryKey("dbo.Games", "Id");
            AddPrimaryKey("dbo.Teams", "Id");
            CreateIndex("dbo.Games", "Name", unique: true);
            CreateIndex("dbo.Games", "URL", unique: true);
            CreateIndex("dbo.Teams", "Name", unique: true);
            AddForeignKey("dbo.TeamGames", "Game_Id", "dbo.Games", "Id", cascadeDelete: true);
            AddForeignKey("dbo.UserGames", "GameId", "dbo.Games", "Id", cascadeDelete: true);
            AddForeignKey("dbo.TeamGames", "Team_Id", "dbo.Teams", "Id", cascadeDelete: true);
            AddForeignKey("dbo.UserTeams", "TeamId", "dbo.Teams", "Id", cascadeDelete: true);
            DropColumn("dbo.Games", "Key");
            DropColumn("dbo.Teams", "Key");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Teams", "Key", c => c.Guid(nullable: false, identity: true));
            AddColumn("dbo.Games", "Key", c => c.Guid(nullable: false, identity: true));
            DropForeignKey("dbo.UserTeams", "TeamId", "dbo.Teams");
            DropForeignKey("dbo.TeamGames", "Team_Id", "dbo.Teams");
            DropForeignKey("dbo.UserGames", "GameId", "dbo.Games");
            DropForeignKey("dbo.TeamGames", "Game_Id", "dbo.Games");
            DropIndex("dbo.Teams", new[] { "Name" });
            DropIndex("dbo.Games", new[] { "URL" });
            DropIndex("dbo.Games", new[] { "Name" });
            DropPrimaryKey("dbo.Teams");
            DropPrimaryKey("dbo.Games");
            AlterColumn("dbo.Teams", "Name", c => c.String());
            AlterColumn("dbo.Games", "Name", c => c.String());
            DropColumn("dbo.UserTeams", "CreatedDate");
            DropColumn("dbo.UserGames", "CreatedDate");
            DropColumn("dbo.Teams", "CreatedDate");
            DropColumn("dbo.Teams", "Id");
            DropColumn("dbo.Games", "CreatedDate");
            DropColumn("dbo.Games", "URL");
            DropColumn("dbo.Games", "Id");
            AddPrimaryKey("dbo.Teams", "Key");
            AddPrimaryKey("dbo.Games", "Key");
            RenameIndex(table: "dbo.TeamGames", name: "IX_Game_Id", newName: "IX_Game_Key");
            RenameIndex(table: "dbo.TeamGames", name: "IX_Team_Id", newName: "IX_Team_Key");
            RenameColumn(table: "dbo.TeamGames", name: "Game_Id", newName: "Game_Key");
            RenameColumn(table: "dbo.TeamGames", name: "Team_Id", newName: "Team_Key");
            AddForeignKey("dbo.UserTeams", "TeamId", "dbo.Teams", "Key", cascadeDelete: true);
            AddForeignKey("dbo.TeamGames", "Team_Key", "dbo.Teams", "Key", cascadeDelete: true);
            AddForeignKey("dbo.UserGames", "GameId", "dbo.Games", "Key", cascadeDelete: true);
            AddForeignKey("dbo.TeamGames", "Game_Key", "dbo.Games", "Key", cascadeDelete: true);
        }
    }
}
