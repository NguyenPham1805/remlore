using System.ComponentModel.DataAnnotations;

namespace Remlore.Domain.Entities
{
    public class Category : RemloreEntity
    {
        [Required]
        [MaxLength(100)]
        public required string Name { get; set; }

        [Required]
        [MaxLength(100)]
        public required string Slug { get; set; }
    }
}
