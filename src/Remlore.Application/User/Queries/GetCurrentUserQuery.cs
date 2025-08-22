using Remlore.Application.Common.Queries;

namespace Remlore.Application.User
{
    public record GetCurrentUserQuery : GetQuery<UserDto>
    {
    }
}
