using Remlore.Domain.Entities;
using Remlore.Domain.Enums;

namespace Remlore.Domain.Interfaces
{
    public interface IUserRepository
    {
        public Task<User?> GetUserByIdAsync(int userId, CancellationToken cancellationToken);

        public Task<User?> GetUserByEmailAsync(string email, CancellationToken cancellationToken);

        public Task<User?> GetUserByRemloreIdAsync(string remloreId, CancellationToken cancellationToken);

        public Task<User?> GetUserBySubAsync(string sub, CancellationToken cancellationToken);

        public Task<ICollection<User>> GetAllUsersAsync(
            string? keyword,
            EUserSortBy? sortBy,
            bool? isDescending = null,
            int skip = 0,
            int take = 10,
            CancellationToken cancellationToken = default);

        public Task<bool> AddUserAsync(User user, CancellationToken cancellationToken);

        public Task<bool> UpdateUserAsync(User user, CancellationToken cancellationToken);

        public Task<bool> DeleteUserAsync(int userId, CancellationToken cancellationToken);
    }
}
