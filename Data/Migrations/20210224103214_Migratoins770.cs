using Microsoft.EntityFrameworkCore.Migrations;

namespace Exam.Data.Migrations
{
    public partial class Migratoins770 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CellData",
                table: "Cells");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CellData",
                table: "Cells",
                type: "TEXT",
                nullable: true);
        }
    }
}
