using System.ComponentModel.DataAnnotations;

namespace Remlore.Domain.Entities
{
    public class Report : RemloreEntity
    {
        public required RemloreUser Reporter { get; set; }

        public required Post Post { get; set; }

        [MaxLength(500)]
        public required string Reason { get; set; }

        public bool IsResolved { get; set; } = false;

        public DateTime? ResolvedAt { get; set; }

        public RemloreUser? ResolvedBy { get; set; }
    }
}
