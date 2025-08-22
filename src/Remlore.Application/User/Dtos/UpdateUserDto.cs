namespace Remlore.Application.User
{
    public record UpdateUserDto(
        string? DisplayName,
        string? AvatarUrl,
        string? Bio,
        string? BannerUrl
    );
}
