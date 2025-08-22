using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Remlore.Identity.Apis
{
    public static class RoleApi
    {
        public static IEndpointRouteBuilder MapRoleApi(this IEndpointRouteBuilder builder)
        {
            var router = builder.MapGroup("api/role")
                .RequireAuthorization(policy => policy.RequireRole("Administrator"));

            router.MapGet("/", GetRoles);
            router.MapPost("/", CreateRole);

            return builder;
        }

        public static async Task<IEnumerable<IdentityRole>> GetRoles(
            RoleManager<IdentityRole> roleManager,
            [FromQuery] string? keyword)
        {
            var query = roleManager.Roles;

            if (!string.IsNullOrEmpty(keyword))
            {
                return await query
                    .Where(r => r.Name!.Contains(keyword))
                    .ToListAsync();
            }

            return await query.ToListAsync();
        }

        public static async Task<IdentityRole> CreateRole(
            RoleManager<IdentityRole> roleManager,
            [FromBody] string roleName)
        {
            var role = new IdentityRole(roleName);
            var result = await roleManager.CreateAsync(role);
            if (result.Succeeded)
            {
                return role;
            }
            throw new Exception(string.Join(", ", result.Errors.Select(e => e.Description)));
        }
    }
}
