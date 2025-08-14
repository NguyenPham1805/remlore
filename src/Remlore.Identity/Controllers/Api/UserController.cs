using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuGet.Packaging;
using Remlore.Identity.Data;
using Remlore.Identity.Models.User;

namespace Remlore.Identity.Controllers.Api
{
    [Route("api/user")]
    [ApiController]
    [Authorize(Roles = "Administrator")]
    public class UserController(UserManager<RemloreIdsUser> _userManager, RoleManager<IdentityRole> _roleManager, IMapper _mapper) : Controller
    {
        [HttpGet]
        public async Task<IActionResult> GetAllUsers([FromQuery] GetUsersRequest request)
        {
            IQueryable<RemloreIdsUser> query = _userManager.Users;

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
                ("DisplayName", false) => query.OrderByDescending(u => u.DisplayName),
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
            response.Users.AddRange(_mapper.Map<List<UserDto>>(users));

            if (request.PageSize > 0)
            {
                response.TotalPage = int.Parse(Math.Ceiling((decimal)totalItems / request.PageSize).ToString());
            }

            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost("{id}/roles")]
        public async Task<IActionResult> AddUserToRole(string id, [FromBody] string roleName)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            if (!await _roleManager.RoleExistsAsync(roleName))
            {
                return BadRequest($"Role '{roleName}' does not exist.");
            }
            var result = await _userManager.AddToRoleAsync(user, roleName);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }
            return Ok();
        }

        [HttpDelete("{id}/roles/{roleName}")]
        public async Task<IActionResult> RemoveUserFromRole(string id, string roleName)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            if (!await _roleManager.RoleExistsAsync(roleName))
            {
                return BadRequest($"Role '{roleName}' does not exist.");
            }
            var result = await _userManager.RemoveFromRoleAsync(user, roleName);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }
            return Ok();
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateUserActive(string id, [FromBody] bool isActive)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound("User Id not found!");
            }
            user.IsActive = isActive;
            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }
            return Ok(user);
        }
    }
}
