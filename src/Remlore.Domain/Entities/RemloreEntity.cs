
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Remlore.Domain.Entities
{
    public abstract class RemloreEntity<TId>
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public TId Id { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? LastModifiedDate { get; set; }

        public bool IsDeleted { get; set; } = false;
    }

    public abstract class RemloreEntity : RemloreEntity<int>
    {
        // This class is intentionally left empty.
        // It serves as a base class for entities with an integer ID.
    }
}
