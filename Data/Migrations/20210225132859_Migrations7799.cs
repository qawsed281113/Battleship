using Microsoft.EntityFrameworkCore.Migrations;

namespace Exam.Data.Migrations
{
    public partial class Migrations7799 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "OwnerId",
                table: "Maps",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "GameStatusid",
                table: "Games",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "GameStatus",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GameStatus", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Maps_OwnerId",
                table: "Maps",
                column: "OwnerId");

            migrationBuilder.CreateIndex(
                name: "IX_Games_GameStatusid",
                table: "Games",
                column: "GameStatusid");

            migrationBuilder.AddForeignKey(
                name: "FK_Games_GameStatus_GameStatusid",
                table: "Games",
                column: "GameStatusid",
                principalTable: "GameStatus",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Maps_AspNetUsers_OwnerId",
                table: "Maps",
                column: "OwnerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Games_GameStatus_GameStatusid",
                table: "Games");

            migrationBuilder.DropForeignKey(
                name: "FK_Maps_AspNetUsers_OwnerId",
                table: "Maps");

            migrationBuilder.DropTable(
                name: "GameStatus");

            migrationBuilder.DropIndex(
                name: "IX_Maps_OwnerId",
                table: "Maps");

            migrationBuilder.DropIndex(
                name: "IX_Games_GameStatusid",
                table: "Games");

            migrationBuilder.DropColumn(
                name: "OwnerId",
                table: "Maps");

            migrationBuilder.DropColumn(
                name: "GameStatusid",
                table: "Games");
        }
    }
}
