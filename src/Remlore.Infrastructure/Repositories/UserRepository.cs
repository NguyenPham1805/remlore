using Microsoft.EntityFrameworkCore;
using Remlore.Domain;
using Remlore.Domain.Entities;
using Remlore.Domain.Enums;
using Remlore.Domain.Interfaces;

namespace Remlore.Infrastructure.Repositories
{
    internal class UserRepository(RemloreDbContext _context) : IUserRepository
    {
        public async Task<bool> AddUserAsync(User user, CancellationToken cancellationToken)
        {
            await _context.Users.AddAsync(user, cancellationToken);
            var result = await _context.SaveChangesAsync(cancellationToken);

            return result > 0;
        }
        public async Task<User?> GetUserByEmailAsync(string email, CancellationToken cancellationToken)
        {
            return await _context.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Email == email, cancellationToken);
        }

        public async Task<User?> GetUserByIdAsync(int userId, CancellationToken cancellationToken)
        {
            return await _context.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Id == userId, cancellationToken);
        }

        public async Task<User?> GetUserByRemloreIdAsync(string remloreId, CancellationToken cancellationToken)
        {
            return await _context.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.RemloreId == remloreId, cancellationToken);
        }

        public async Task<User?> GetUserBySubAsync(string sub, CancellationToken cancellationToken)
        {
            return await _context.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Sub == sub, cancellationToken);
        }

        public async Task<ICollection<User>> GetAllUsersAsync(
            string? keyword,
            EUserSortBy? sortBy,
            bool? isDescending = null,
            int skip = 0,
            int take = 10,
            CancellationToken cancellationToken = default)
        {
            IQueryable<User> query = _context.Users;

            if (!string.IsNullOrEmpty(keyword))
            {
                query = query.Where(u =>
                u.DisplayName.Contains(keyword) ||
                u.Email.Contains(keyword) ||
                u.RemloreId.Contains(keyword));
            }

            // Sorting
            query = (sortBy, isDescending) switch
            {
                (EUserSortBy.DisplayName, true) => query.OrderByDescending(u => u.DisplayName),
                (EUserSortBy.DisplayName, false) => query.OrderByDescending(u => u.DisplayName),
                (EUserSortBy.Email, true) => query.OrderByDescending(u => u.Email),
                (EUserSortBy.Email, false) => query.OrderBy(u => u.Email),
                (EUserSortBy.CreatedAt, true) => query.OrderByDescending(u => u.CreatedAt),
                (EUserSortBy.CreatedAt, false) => query.OrderBy(u => u.CreatedAt),
                (EUserSortBy.Experience, true) => query.OrderByDescending(u => u.Experience),
                (EUserSortBy.Experience, false) => query.OrderBy(u => u.Experience),
                (EUserSortBy.PostCount, true) => query.OrderByDescending(u => u.Posts.Count),
                (EUserSortBy.PostCount, false) => query.OrderBy(u => u.Posts.Count),
                _ => query.OrderByDescending(u => u.CreatedAt)
            };

            return await query.Skip(skip).Take(take).ToListAsync(cancellationToken);
        }


        public async Task<bool> UpdateUserAsync(User user, CancellationToken cancellationToken)
        {
            await _context.Users
                .Where(u => u.Id == user.Id)
                .ExecuteUpdateAsync(u => u
                    .SetProperty(x => x.DisplayName, user.DisplayName)
                    .SetProperty(x => x.Bio, user.Bio)
                    .SetProperty(x => x.Email, user.Email)
                    .SetProperty(x => x.AvatarUrl, user.AvatarUrl)
                    .SetProperty(x => x.BannerUrl, user.BannerUrl)
                    .SetProperty(x => x.RemloreId, user.RemloreId), cancellationToken);

            var result = await _context.SaveChangesAsync(cancellationToken);
            return result > 0;
        }
        public async Task<bool> DeleteUserAsync(int userId, CancellationToken cancellationToken)
        {
            await _context.Users
                .Where(u => u.Id == userId)
                .ExecuteDeleteAsync(cancellationToken);

            var result = await _context.SaveChangesAsync(cancellationToken);
            return result > 0;
        }
    }
}
