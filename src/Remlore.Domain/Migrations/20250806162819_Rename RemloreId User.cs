using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Remlore.Domain.Migrations
{
    /// <inheritdoc />
    public partial class RenameRemloreIdUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "remloreId",
                table: "Users",
                newName: "RemloreId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RemloreId",
                table: "Users",
                newName: "remloreId");
        }
    }
}
