using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Remlore.Identity.Data
{
    public class RemloreIdsUser : IdentityUser
    {
        [Required]
        [MaxLength(255)]
        public required string DisplayName { get; set; }

        [MaxLength(500)]
        public string? AvatarUrl { get; set; }
    }
}
