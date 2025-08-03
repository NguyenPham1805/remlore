using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Remlore.Domain.Entities;

namespace Remlore.Domain
{
    public class RemloreDbContext(DbContextOptions<RemloreDbContext> options) : IdentityDbContext<RemloreUser>(options)
    {
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Anime> Animes { get; set; }

        public DbSet<Post> Posts { get; set; }

        public DbSet<PostReaction> Reactions { get; set; }

        public DbSet<PostMedia> PostMedias { get; set; }

        public DbSet<CommentPost> Comments { get; set; }

        public DbSet<CommentPostReaction> CommentReactions { get; set; }

        public DbSet<Review> Reviews { get; set; }

        public DbSet<CommentReview> CommentReviews { get; set; }

        public DbSet<CommentReviewReaction> CommentReviewReactions { get; set; }

        public DbSet<Report> Reports { get; set; }

        public DbSet<Tag> Tags { get; set; }
    }
}
