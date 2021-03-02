using Microsoft.EntityFrameworkCore.Migrations;

namespace Exam.Data.Migrations
{
    public partial class Mifraradf : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "CellTypes",
                columns: new[] { "Id", "TypeName" },
                values: new object[] { 1, "ship" });

            migrationBuilder.InsertData(
                table: "CellTypes",
                columns: new[] { "Id", "TypeName" },
                values: new object[] { 2, "field" });

            migrationBuilder.InsertData(
                table: "CellTypes",
                columns: new[] { "Id", "TypeName" },
                values: new object[] { 3, "miss" });

            migrationBuilder.InsertData(
                table: "CellTypes",
                columns: new[] { "Id", "TypeName" },
                values: new object[] { 4, "crashed" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "CellTypes",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "CellTypes",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "CellTypes",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "CellTypes",
                keyColumn: "Id",
                keyValue: 4);
        }
    }
}
