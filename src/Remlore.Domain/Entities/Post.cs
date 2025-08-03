using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Remlore.Domain.Entities
{
    public class Post : RemloreEntity
    {
        [Required]
        [MaxLength(500)]
        public required string Title { get; set; }

        [Required]
        [MaxLength(500)]
        public required string Slug { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(MAX)")]
        public string? Content { get; set; }

        [Required]
        public required RemloreUser Author { get; set; }

        public ICollection<PostMedia> Medias { get; set; } = [];

        public ICollection<Tag> Tags { get; set; } = [];

        public ICollection<CommentPost> Comments { get; set; } = [];

        public ICollection<PostReaction> Reactions { get; set; } = [];

        public ICollection<Report> Reports { get; set; } = [];

        public int ViewCount { get; set; } = 0;
    }
}
