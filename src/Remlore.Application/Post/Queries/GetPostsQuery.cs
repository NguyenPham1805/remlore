using Remlore.Application.Common.Queries;

namespace Remlore.Application.Post
{
    public record GetPostsQuery : GetQuery<ICollection<PostDto>>
    {
        public Guid? UserId { get; set; }
        public string? Keyword { get; set; }
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public EPostSortBy SortBy { get; set; } = EPostSortBy.Newest;
    }
}
