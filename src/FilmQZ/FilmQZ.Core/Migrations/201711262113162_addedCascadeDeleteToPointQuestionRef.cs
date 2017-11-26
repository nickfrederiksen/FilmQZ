namespace FilmQZ.Core.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addedCascadeDeleteToPointQuestionRef : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Points", "QuestionId", "dbo.Questions");
            AddForeignKey("dbo.Points", "QuestionId", "dbo.Questions", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Points", "QuestionId", "dbo.Questions");
            AddForeignKey("dbo.Points", "QuestionId", "dbo.Questions", "Id");
        }
    }
}
