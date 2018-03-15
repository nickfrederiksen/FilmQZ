namespace FilmQZ.Core.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddUserProfile : DbMigration
    {
		public override void Up()
		{
			CreateTable(
				"dbo.UserProfiles",
				c => new
				{
					UserId = c.String(nullable: false, maxLength: 128),
					CreatedDate = c.DateTime(nullable: false, defaultValueSql: "GETDATE()"),
					FullName = c.String(nullable: false),
					PhoneNumber = c.String(),
					Description = c.String(),
				})
				.PrimaryKey(t => t.UserId);


			AddForeignKey("dbo.UserProfiles", "UserId", "dbo.AspNetUsers", "Id", cascadeDelete: true);

		}
        
        public override void Down()
		{
			DropForeignKey("dbo.UserProfiles", "UserId", "dbo.AspNetUsers");

			DropTable("dbo.UserProfiles");
        }
    }
}
