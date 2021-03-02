using Microsoft.EntityFrameworkCore.Migrations;

namespace Exam.Data.Migrations
{
    public partial class Mifeadf : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CellCellType");

            migrationBuilder.DropTable(
                name: "Cells");

            migrationBuilder.DropTable(
                name: "CellTypes");

            migrationBuilder.AddColumn<string>(
                name: "Map_str",
                table: "Maps",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Map_str",
                table: "Maps");

            migrationBuilder.CreateTable(
                name: "Cells",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    MapId = table.Column<int>(type: "INTEGER", nullable: true),
                    cellNum = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cells", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Cells_Maps_MapId",
                        column: x => x.MapId,
                        principalTable: "Maps",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CellTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    TypeName = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CellTypes", x => x.Id);
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
                        name: "FK_CellCellType_CellTypes_CellTypesId",
                        column: x => x.CellTypesId,
                        principalTable: "CellTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

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

            migrationBuilder.CreateIndex(
                name: "IX_CellCellType_CellsId",
                table: "CellCellType",
                column: "CellsId");

            migrationBuilder.CreateIndex(
                name: "IX_Cells_MapId",
                table: "Cells",
                column: "MapId");
        }
    }
}
