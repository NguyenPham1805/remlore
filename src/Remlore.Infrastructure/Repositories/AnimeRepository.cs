using Remlore.Domain;
using Remlore.Domain.Entities;
using Remlore.Domain.Interfaces;

namespace Remlore.Infrastructure.Repositories
{
    public class AnimeRepository(RemloreDbContext _remloreDbContext) : IAnimeRepository
    {
        public async Task<bool> CreateAnimeAsync(Anime anime, CancellationToken cancellationToken)
        {
            await _remloreDbContext.Animes.AddAsync(anime, cancellationToken);
            var result = await _remloreDbContext.SaveChangesAsync(cancellationToken);

            if (result > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<bool> DeleteAnimeAsync(string Id, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public async Task<Anime> GetAnimeByIdAsync(string Id, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public async Task<ICollection<Anime>> GetAnimesAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<bool> UpdateAnimeAsync(Anime anime, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
