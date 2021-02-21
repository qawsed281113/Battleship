using Microsoft.EntityFrameworkCore.Migrations;

namespace Exam.Data.Migrations
{
    public partial class Migrations2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "OwnerId",
                table: "Maps",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserTurnId",
                table: "Games",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "GameId",
                table: "AspNetUsers",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Maps_OwnerId",
                table: "Maps",
                column: "OwnerId");

            migrationBuilder.CreateIndex(
                name: "IX_Games_UserTurnId",
                table: "Games",
                column: "UserTurnId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_GameId",
                table: "AspNetUsers",
                column: "GameId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Games_GameId",
                table: "AspNetUsers",
                column: "GameId",
                principalTable: "Games",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Games_AspNetUsers_UserTurnId",
                table: "Games",
                column: "UserTurnId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
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
                name: "FK_AspNetUsers_Games_GameId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_Games_AspNetUsers_UserTurnId",
                table: "Games");

            migrationBuilder.DropForeignKey(
                name: "FK_Maps_AspNetUsers_OwnerId",
                table: "Maps");

            migrationBuilder.DropIndex(
                name: "IX_Maps_OwnerId",
                table: "Maps");

            migrationBuilder.DropIndex(
                name: "IX_Games_UserTurnId",
                table: "Games");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_GameId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "OwnerId",
                table: "Maps");

            migrationBuilder.DropColumn(
                name: "UserTurnId",
                table: "Games");

            migrationBuilder.DropColumn(
                name: "GameId",
                table: "AspNetUsers");
        }
    }
}
