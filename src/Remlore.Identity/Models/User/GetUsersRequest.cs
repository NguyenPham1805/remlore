namespace Remlore.Identity.Models.User
{
    public record GetUsersRequest
    {
        public string? Keyword { get; init; }
        public string? SortBy { get; init; }
        public bool? IsDescending { get; init; }
        public int PageIndex { get; init; } = 1;
        public int PageSize { get; init; } = 10;
    }
}
