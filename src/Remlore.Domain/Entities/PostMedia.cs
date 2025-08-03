using System.ComponentModel.DataAnnotations;

namespace Remlore.Domain.Entities
{
    public class PostMedia : RemloreEntity
    {
        public required Post Post { get; set; }

        [StringLength(255)]
        public required string FileName { get; set; }

        [StringLength(1024)]
        public required string FilePath { get; set; }

        [StringLength(500)]
        public string? Caption { get; set; }

        public int Order { get; set; } = 0;
    }
}
