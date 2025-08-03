using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Remlore.Domain.Entities
{
    public class RemloreUser : IdentityUser
    {
        [Required]
        [MaxLength(255)]
        public required string DisplayName { get; set; }

        [Required]
        [MaxLength(100)]
        public required string remloreId { get; set; }

        [MaxLength(500)]
        public string? Bio { get; set; }

        [MaxLength(500)]
        public string? AvatarUrl { get; set; }

        [MaxLength(500)]
        public string? BannerUrl { get; set; }

        public int Level { get; set; } = 1;

        public int Experience { get; set; } = 0;

        public ICollection<Post> Posts { get; set; } = [];

        public ICollection<Review> Reviews { get; set; } = [];
    }
}
