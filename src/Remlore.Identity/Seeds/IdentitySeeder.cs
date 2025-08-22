using Microsoft.AspNetCore.Identity;
using Remlore.Identity.Data;
using System.Security.Claims;
using static OpenIddict.Abstractions.OpenIddictConstants;

namespace Remlore.Identity.Seeds
{

    public class IdentitySeeder
    {
        public async Task SeedAdminAsync(IServiceProvider serviceProvider)
        {
            var userManager = serviceProvider.GetRequiredService<UserManager<RemloreIdsUser>>();
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();

            const string adminRoleName = "Administrator";
            const string adminEmail = "admin@remlore.com";
            const string adminPassword = "admin@123";

            if (!await roleManager.RoleExistsAsync(adminRoleName))
            {
                var role = new IdentityRole(adminRoleName);
                await roleManager.CreateAsync(role);

                //await roleManager.AddClaimAsync(role, new Claim("permission", "manage_users"));
                //await roleManager.AddClaimAsync(role, new Claim("permission", "manage_clients"));
            }

            var adminUser = await userManager.FindByEmailAsync(adminEmail);
            if (adminUser == null)
            {
                adminUser = new RemloreIdsUser
                {
                    DisplayName = "Remlore Administrator",
                    UserName = adminEmail,
                    Email = adminEmail,
                    EmailConfirmed = true
                };
                var result = await userManager.CreateAsync(adminUser, adminPassword);
                if (!result.Succeeded)
                {
                    throw new Exception("Failed to create admin user: " + string.Join(", ", result.Errors.Select(e => e.Description)));
                }

                await userManager.AddToRoleAsync(adminUser, adminRoleName);

                var claims = new List<Claim>
                {
                    new(Claims.Name, "Super Administrator"),
                    new(Claims.Role, adminRoleName),
                    new("avatar", "https://img-9gag-fun.9cache.com/photo/aNpjZ03_460s.jpg"),
                };
                await userManager.AddClaimsAsync(adminUser, claims);
            }
        }
    }

}
