using System.ComponentModel.DataAnnotations;

namespace Remlore.Domain.Entities
{
    public class CommentPost : RemloreEntity
    {
        public required Post Post { get; set; }

        public required RemloreUser Author { get; set; }

        [MaxLength(500)]
        public required string Content { get; set; }

        public ICollection<CommentPostReaction> Reactions { get; set; } = [];

        public ICollection<CommentPost> Replies { get; set; } = [];
    }
}
