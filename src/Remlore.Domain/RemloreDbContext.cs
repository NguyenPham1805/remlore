using Microsoft.EntityFrameworkCore;
using Remlore.Domain.Entities;

namespace Remlore.Domain
{
    public class RemloreDbContext(DbContextOptions<RemloreDbContext> options) : DbContext(options)
    {
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // This is to ensure that all foreign keys that have a cascade delete behavior are set to restrict.
            var cascadeFKs = modelBuilder.Model.GetEntityTypes()
                .SelectMany(t => t.GetForeignKeys())
                .Where(fk => !fk.IsOwnership && fk.DeleteBehavior == DeleteBehavior.Cascade);

            foreach (var fk in cascadeFKs)
                fk.DeleteBehavior = DeleteBehavior.Restrict;

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Anime> Animes { get; set; }

        public DbSet<Post> Posts { get; set; }

        public DbSet<PostReaction> PostReactions { get; set; }

        public DbSet<PostMedia> PostMedias { get; set; }

        public DbSet<CommentPost> CommentPosts { get; set; }

        public DbSet<CommentPostReaction> CommentPostsReactions { get; set; }

        public DbSet<Review> Reviews { get; set; }

        public DbSet<CommentReview> CommentReviews { get; set; }

        public DbSet<CommentReviewReaction> CommentReviewReactions { get; set; }

        public DbSet<Report> Reports { get; set; }

        public DbSet<Tag> Tags { get; set; }
    }
}
