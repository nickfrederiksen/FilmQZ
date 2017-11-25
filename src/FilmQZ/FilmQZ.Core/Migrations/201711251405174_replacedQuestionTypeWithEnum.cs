namespace FilmQZ.Core.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class replacedQuestionTypeWithEnum : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Questions", "QuestionTypeId", "dbo.QuestionTypes");
            DropIndex("dbo.Questions", new[] { "QuestionTypeId" });
            AddColumn("dbo.Questions", "QuestionType", c => c.Int(nullable: false));
            DropColumn("dbo.Questions", "QuestionTypeId");
            DropTable("dbo.QuestionTypes");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.QuestionTypes",
                c => new
                    {
                        Id = c.Guid(nullable: false, identity: true),
                        CreatedDate = c.DateTime(nullable: false),
                        FullyQualifiedTypeName = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.Questions", "QuestionTypeId", c => c.Guid(nullable: false));
            DropColumn("dbo.Questions", "QuestionType");
            CreateIndex("dbo.Questions", "QuestionTypeId");
            AddForeignKey("dbo.Questions", "QuestionTypeId", "dbo.QuestionTypes", "Id", cascadeDelete: true);
        }
    }
}
