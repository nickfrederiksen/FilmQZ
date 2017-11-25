namespace FilmQZ.Core.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addedGameEntities : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.AnswerPoints",
                c => new
                    {
                        AnswerId = c.Guid(nullable: false),
                        CreatedDate = c.DateTime(nullable: false),
                        PointId = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => t.AnswerId)
                .ForeignKey("dbo.Answers", t => t.AnswerId)
                .ForeignKey("dbo.Points", t => t.PointId, cascadeDelete: true)
                .Index(t => t.AnswerId)
                .Index(t => t.PointId);
            
            CreateTable(
                "dbo.Answers",
                c => new
                    {
                        Id = c.Guid(nullable: false, identity: true),
                        CreatedDate = c.DateTime(nullable: false),
                        Value = c.String(nullable: false, maxLength: 280),
                        QuestionId = c.Guid(nullable: false),
                        TeamId = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Questions", t => t.QuestionId, cascadeDelete: true)
                .ForeignKey("dbo.Teams", t => t.TeamId, cascadeDelete: true)
                .Index(t => t.QuestionId)
                .Index(t => t.TeamId);
            
            CreateTable(
                "dbo.Questions",
                c => new
                    {
                        Id = c.Guid(nullable: false, identity: true),
                        CreatedDate = c.DateTime(nullable: false),
                        Text = c.String(nullable: false, maxLength: 280),
                        QuestionTypeId = c.Guid(nullable: false),
                        PointId = c.Guid(nullable: false),
                        RoundId = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.QuestionTypes", t => t.QuestionTypeId, cascadeDelete: true)
                .ForeignKey("dbo.Rounds", t => t.RoundId, cascadeDelete: true)
                .Index(t => new { t.Text, t.RoundId }, unique: true, name: "UQ_Question")
                .Index(t => t.QuestionTypeId);
            
            CreateTable(
                "dbo.Points",
                c => new
                    {
                        QuestionId = c.Guid(nullable: false),
                        CreatedDate = c.DateTime(nullable: false),
                        Value = c.Decimal(nullable: false, precision: 18, scale: 2),
                    })
                .PrimaryKey(t => t.QuestionId)
                .ForeignKey("dbo.Questions", t => t.QuestionId)
                .Index(t => t.QuestionId);
            
            CreateTable(
                "dbo.QuestionTypes",
                c => new
                    {
                        Id = c.Guid(nullable: false, identity: true),
                        CreatedDate = c.DateTime(nullable: false),
                        FullyQualifiedTypeName = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Rounds",
                c => new
                    {
                        Id = c.Guid(nullable: false, identity: true),
                        CreatedDate = c.DateTime(nullable: false),
                        Name = c.String(nullable: false, maxLength: 250),
                        Description = c.String(),
                        GameId = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Games", t => t.GameId, cascadeDelete: true)
                .Index(t => new { t.Name, t.GameId }, unique: true, name: "UQ_Round");
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.AnswerPoints", "PointId", "dbo.Points");
            DropForeignKey("dbo.AnswerPoints", "AnswerId", "dbo.Answers");
            DropForeignKey("dbo.Answers", "TeamId", "dbo.Teams");
            DropForeignKey("dbo.Answers", "QuestionId", "dbo.Questions");
            DropForeignKey("dbo.Questions", "RoundId", "dbo.Rounds");
            DropForeignKey("dbo.Rounds", "GameId", "dbo.Games");
            DropForeignKey("dbo.Questions", "QuestionTypeId", "dbo.QuestionTypes");
            DropForeignKey("dbo.Points", "QuestionId", "dbo.Questions");
            DropIndex("dbo.Rounds", "UQ_Round");
            DropIndex("dbo.Points", new[] { "QuestionId" });
            DropIndex("dbo.Questions", new[] { "QuestionTypeId" });
            DropIndex("dbo.Questions", "UQ_Question");
            DropIndex("dbo.Answers", new[] { "TeamId" });
            DropIndex("dbo.Answers", new[] { "QuestionId" });
            DropIndex("dbo.AnswerPoints", new[] { "PointId" });
            DropIndex("dbo.AnswerPoints", new[] { "AnswerId" });
            DropTable("dbo.Rounds");
            DropTable("dbo.QuestionTypes");
            DropTable("dbo.Points");
            DropTable("dbo.Questions");
            DropTable("dbo.Answers");
            DropTable("dbo.AnswerPoints");
        }
    }
}
