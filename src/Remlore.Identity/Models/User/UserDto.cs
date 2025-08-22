namespace Remlore.Identity.Models.User
{
    public record UserDto
    {
        public required string Id { get; set; }
        public required string DisplayName { get; set; }
        public string? AvatarUrl { get; set; }
        public DateTimeOffset? LastLogin { get; set; }
        public DateTimeOffset? CreatedAt { get; set; }
        public bool IsActive { get; set; }
        public required string Email { get; set; }
        public IEnumerable<string> Roles { get; set; } = [];
    }
}
