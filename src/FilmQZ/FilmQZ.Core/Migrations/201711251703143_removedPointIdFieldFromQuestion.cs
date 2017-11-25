namespace FilmQZ.Core.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class removedPointIdFieldFromQuestion : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Questions", "PointId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Questions", "PointId", c => c.Guid(nullable: false));
        }
    }
}
