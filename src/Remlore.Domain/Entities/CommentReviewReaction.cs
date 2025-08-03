using System.ComponentModel.DataAnnotations;

namespace Remlore.Domain.Entities
{
    public class CommentReviewReaction : RemloreEntity
    {
        public required RemloreUser User { get; set; }

        public required Post Post { get; set; }

        [MaxLength(50)]
        public required string Emoji { get; set; }
    }
}
