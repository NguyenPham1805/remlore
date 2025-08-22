using Remlore.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace Remlore.Domain.Entities
{
    public class Review : RemloreEntity
    {
        public required User User { get; set; }

        public required Anime Anime { get; set; }

        public int Score { get; set; }

        public EReviewType Type { get; set; }

        [MaxLength(1024)]
        public required string Content { get; set; }

        public ICollection<CommentReview> Comments { get; set; } = [];

        public ICollection<CommentReviewReaction> Reactions { get; set; } = [];
    }
}
