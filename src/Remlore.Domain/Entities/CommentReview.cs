using System.ComponentModel.DataAnnotations;

namespace Remlore.Domain.Entities
{
    public class CommentReview : RemloreEntity
    {
        public required Post Post { get; set; }

        public required User Author { get; set; }

        [MaxLength(500)]
        public required string Content { get; set; }

        public ICollection<CommentReviewReaction> Reactions { get; set; } = [];

        public ICollection<CommentReview> Replies { get; set; } = [];
    }
}
