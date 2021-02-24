using Microsoft.EntityFrameworkCore.Migrations;

namespace Exam.Data.Migrations
{
    public partial class Migrations613 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CellType",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    TypeName = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CellType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CellCellType",
                columns: table => new
                {
                    CellTypesId = table.Column<int>(type: "INTEGER", nullable: false),
                    CellsId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CellCellType", x => new { x.CellTypesId, x.CellsId });
                    table.ForeignKey(
                        name: "FK_CellCellType_Cells_CellsId",
                        column: x => x.CellsId,
                        principalTable: "Cells",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CellCellType_CellType_CellTypesId",
                        column: x => x.CellTypesId,
                        principalTable: "CellType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CellCellType_CellsId",
                table: "CellCellType",
                column: "CellsId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CellCellType");

            migrationBuilder.DropTable(
                name: "CellType");
        }
    }
}
