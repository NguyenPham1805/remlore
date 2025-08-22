using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuGet.Packaging;
using Remlore.Identity.Data;
using Remlore.Identity.Models.User;

namespace Remlore.Identity.Apis
{
    public static class UserApi
    {
        public static IEndpointRouteBuilder MapUserApi(this IEndpointRouteBuilder builder)
        {
            var router = builder.MapGroup("api/user")
                                .RequireAuthorization(policy => policy.RequireRole("Administrator"));

            router.MapGet("/", GetAllUsers);
            router.MapGet("/{id}", GetUserById);
            router.MapPost("/{id}/roles/{roleName}", AddUserToRole);
            router.MapDelete("/{id}/roles/{roleName}", RemoveUserFromRole);
            router.MapPatch("/{id}/active", UpdateUserActive);

            return builder;
        }

        public static async Task<IResult> GetAllUsers(
            UserManager<RemloreIdsUser> userManager,
            IMapper mapper,
            [FromBody] GetUsersRequest request)
        {
            var query = userManager.Users;
            if (!string.IsNullOrEmpty(request.Keyword))
            {
                query = query.Where(u =>
                u.DisplayName.Contains(request.Keyword) ||
                u.Email!.Contains(request.Keyword));
            }

            // Sorting
            query = (request.SortBy, request.IsDescending) switch
            {
                ("DisplayName", true) => query.OrderByDescending(u => u.DisplayName),
                ("DisplayName", false) => query.OrderBy(u => u.DisplayName),
                ("Email", true) => query.OrderByDescending(u => u.Email),
                ("Email", false) => query.OrderBy(u => u.Email),
                ("CreatedAt", true) => query.OrderByDescending(u => u.CreatedAt),
                ("CreatedAt", false) => query.OrderBy(u => u.CreatedAt),
                _ => query.OrderByDescending(u => u.CreatedAt)
            };
            var totalItems = await query.CountAsync();
            var users = await query.Skip((request.PageIndex - 1) * request.PageSize)
                                    .Take(request.PageSize)
                                    .ToListAsync();
            var response = new GetUsersResponse
            {
                PageIndex = request.PageIndex,
                PageSize = request.PageSize,
                TotalItems = totalItems,
            };
            response.Users.AddRange(mapper.Map<List<UserDto>>(users));

            if (request.PageSize > 0)
            {
                response.TotalPage = (int)Math.Ceiling((decimal)totalItems / request.PageSize);
            }

            return Results.Ok(response);
        }

        public static async Task<IResult> GetUserById(UserManager<RemloreIdsUser> userManager, string id)
        {
            var user = await userManager.FindByIdAsync(id);
            if (user == null)
            {
                return Results.NotFound();
            }
            return Results.Ok(user);
        }

        public static async Task<IResult> AddUserToRole(
            UserManager<RemloreIdsUser> userManager,
            string id,
            string roleName)
        {
            var user = await userManager.FindByIdAsync(id);
            if (user == null)
            {
                return Results.NotFound();
            }
            var result = await userManager.AddToRoleAsync(user, roleName);
            if (result.Succeeded)
            {
                return Results.Ok();
            }
            return Results.BadRequest(result.Errors.Select(e => e.Description));
        }

        public static async Task<IResult> RemoveUserFromRole(
            UserManager<RemloreIdsUser> userManager,
            string id,
            string roleName)
        {
            var user = await userManager.FindByIdAsync(id);
            if (user == null)
            {
                return Results.NotFound();
            }
            var result = await userManager.RemoveFromRoleAsync(user, roleName);
            if (result.Succeeded)
            {
                return Results.Ok();
            }
            return Results.BadRequest(result.Errors.Select(e => e.Description));
        }

        public static async Task<IResult> UpdateUserActive(
            UserManager<RemloreIdsUser> userManager,
            string id,
            bool isActive)
        {
            var user = await userManager.FindByIdAsync(id);
            if (user == null)
            {
                return Results.NotFound("User Id not found!");
            }
            user.IsActive = isActive;
            var result = await userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                return Results.BadRequest(result.Errors);
            }
            return Results.Ok(user);
        }
    }
}
