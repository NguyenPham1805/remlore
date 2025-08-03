using Remlore.Domain.Entities;

namespace Remlore.Domain.Interfaces
{
    public interface IPostRepository
    {
        public Task<Post> GetPostByIdAsync(int postId, CancellationToken cancellationToken);

        public Task<ICollection<Post>> GetPostsByAuthorIdAsync(int authorId, CancellationToken cancellationToken);

        public Task<ICollection<Post>> GetPostsAsync(CancellationToken cancellationToken);

        public Task CreatePostAsync(Post post, CancellationToken cancellationToken);

        public Task UpdatePostAsync(Post post, CancellationToken cancellationToken);

        public Task DeletePostAsync(int postId, CancellationToken cancellationToken);
    }
}
