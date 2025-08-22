using System.ComponentModel.DataAnnotations;

namespace Remlore.Domain.Entities
{
    public class Tag : RemloreEntity
    {
        [Required]
        [MaxLength(50)]
        public required string Name { get; set; }

        [Required]
        [MaxLength(50)]
        public required string Slug { get; set; }

        [MaxLength(8)]
        public string? Color { get; set; }
    }
}
