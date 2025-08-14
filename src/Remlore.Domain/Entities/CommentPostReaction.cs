using System.ComponentModel.DataAnnotations;

namespace Remlore.Domain.Entities
{
    public class CommentPostReaction : RemloreEntity
    {
        public required User User { get; set; }

        public required CommentPost CommentPost { get; set; }

        [MaxLength(50)]
        public required string Emoji { get; set; }
    }
}
