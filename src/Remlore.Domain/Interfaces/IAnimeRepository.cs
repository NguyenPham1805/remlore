using Remlore.Domain.Entities;

namespace Remlore.Domain.Interfaces
{
    public interface IAnimeRepository
    {
        public Task<Anime> GetAnimeByIdAsync(string Id, CancellationToken cancellationToken);

        public Task<ICollection<Anime>> GetAnimesAsync();

        public Task<bool> CreateAnimeAsync(Anime anime, CancellationToken cancellationToken);

        public Task<bool> UpdateAnimeAsync(Anime anime, CancellationToken cancellationToken);

        public Task<bool> DeleteAnimeAsync(string Id, CancellationToken cancellationToken);
    }
}
