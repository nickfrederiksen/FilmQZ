namespace FilmQZ.Core.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addedMissingDefaultValuesForGameEntities : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.AnswerPoints", "CreatedDate", c => c.DateTime(nullable: false, defaultValueSql: "GETDATE()"));
            AlterColumn("dbo.Answers", "CreatedDate", c => c.DateTime(nullable: false, defaultValueSql: "GETDATE()"));
            AlterColumn("dbo.Questions", "CreatedDate", c => c.DateTime(nullable: false, defaultValueSql: "GETDATE()"));
            AlterColumn("dbo.Points", "CreatedDate", c => c.DateTime(nullable: false, defaultValueSql: "GETDATE()"));
            AlterColumn("dbo.Rounds", "CreatedDate", c => c.DateTime(nullable: false, defaultValueSql: "GETDATE()"));
            
            AlterColumn("dbo.Answers", "Id", c => c.Guid(nullable: false, identity: true, defaultValueSql: "NEWSEQUENTIALID()"));
            AlterColumn("dbo.Questions", "Id", c => c.Guid(nullable: false, identity: true, defaultValueSql: "NEWSEQUENTIALID()"));
            AlterColumn("dbo.Rounds", "Id", c => c.Guid(nullable: false, identity: true, defaultValueSql: "NEWSEQUENTIALID()"));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.AnswerPoints", "CreatedDate", c => c.DateTime(nullable: false));
            AlterColumn("dbo.Answers", "CreatedDate", c => c.DateTime(nullable: false));
            AlterColumn("dbo.Questions", "CreatedDate", c => c.DateTime(nullable: false));
            AlterColumn("dbo.Points", "CreatedDate", c => c.DateTime(nullable: false));
            AlterColumn("dbo.Rounds", "CreatedDate", c => c.DateTime(nullable: false));
            
            AlterColumn("dbo.Answers", "Id", c => c.Guid(nullable: false, identity: true));
            AlterColumn("dbo.Questions", "Id", c => c.Guid(nullable: false, identity: true));
            AlterColumn("dbo.Rounds", "Id", c => c.Guid(nullable: false, identity: true));
        }
    }
}
