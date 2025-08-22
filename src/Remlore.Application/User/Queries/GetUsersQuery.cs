using Remlore.Application.Common;
using Remlore.Application.Common.Queries;
using Remlore.Domain.Enums;

namespace Remlore.Application.User
{
    public record GetUsersQuery : GetQuery<Pagination<UserDto>>
    {
        public string? Keyword { get; set; }

        public EUserSortBy? SortBy { get; set; }

        public bool IsDescending { get; set; }

        public int PageNumber { get; set; } = 1;

        public int PageSize { get; set; } = 10;
    }
}
