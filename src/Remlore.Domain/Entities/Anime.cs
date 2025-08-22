using System.ComponentModel.DataAnnotations;

namespace Remlore.Domain.Entities
{
    public class Anime : RemloreEntity
    {
        [Required]
        public required int AnilistId { get; set; }

        public ICollection<Review> Reviews { get; set; } = [];
    }
}
