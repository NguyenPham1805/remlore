using Microsoft.EntityFrameworkCore;
using Remlore.Domain;
using Remlore.Domain.Entities;
using Remlore.Domain.Interfaces;


namespace Remlore.Infrastructure.Repositories
{
    public class PostRepository(RemloreDbContext _context) : IPostRepository
    {
        public Task CreatePostAsync(Post post, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task DeletePostAsync(int postId, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<Post> GetPostByIdAsync(int postId, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public async Task<ICollection<Post>> GetPostsAsync(CancellationToken cancellationToken)
        {
            var posts = await _context.Posts.ToListAsync(cancellationToken);
            return posts;
        }

        public Task<ICollection<Post>> GetPostsByAuthorIdAsync(int authorId, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task UpdatePostAsync(Post post, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
