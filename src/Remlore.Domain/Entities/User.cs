using System.ComponentModel.DataAnnotations;

namespace Remlore.Domain.Entities
{
    public class User : RemloreEntity<Guid>
    {
        [Required]
        [MaxLength(255)]
        public required string DisplayName { get; set; }

        [Required]
        [EmailAddress]
        public required string Email { get; set; }

        [Required]
        [MaxLength(100)]
        public required string RemloreId { get; set; }

        [Required]
        [MaxLength(100)]
        public required string Sub { get; set; }

        [MaxLength(500)]
        public string? Bio { get; set; }

        [MaxLength(500)]
        public string? AvatarUrl { get; set; }

        [MaxLength(500)]
        public string? BannerUrl { get; set; }

        public int Level { get; set; } = 1;

        public int Experience { get; set; } = 0;

        public ICollection<Post> Posts { get; set; } = [];

        public ICollection<CommentPost> CommentPosts { get; set; } = [];

        public ICollection<PostReaction> PostReactions { get; set; } = [];

        public ICollection<Review> Reviews { get; set; } = [];

        public ICollection<CommentReview> CommentReviews { get; set; } = [];

        public ICollection<CommentReviewReaction> CommentReviewReactions { get; set; } = [];
    }
}
