using Remlore.Application.Common;
using Remlore.Application.Common.Queries;
using Remlore.Domain.Enums;

namespace Remlore.Application.User
{
    public class GetUsersQuery(string? keyword, EUserSortBy? sortBy, bool isDescending, int pageNumber = 1, int pageSize = 1) : GetQuery<Pagination<UserDto>>
    {
        public string? Keyword { get; set; } = keyword;

        public EUserSortBy? SortBy { get; set; } = sortBy;

        public bool IsDescending { get; set; } = isDescending;

        public int PageNumber { get; set; } = pageNumber;

        public int PageSize { get; set; } = pageSize;
    }
}
