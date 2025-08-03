using Remlore.Application.Common.Queries;

namespace Remlore.Application.Post
{
    public class GetPostsQuery(Guid? userId, string? keyword, int? pageNumber, int? pageSize, EPostSortBy? SortBy) : GetQuery<ICollection<PostDto>>
    {
        public Guid? UserId { get; set; } = userId;
        public string? Keyword { get; set; } = keyword;
        public int PageNumber { get; set; } = pageNumber ?? 1;
        public int PageSize { get; set; } = pageSize ?? 1;
        public EPostSortBy SortBy { get; set; } = SortBy ?? EPostSortBy.Newest;
    }
}
