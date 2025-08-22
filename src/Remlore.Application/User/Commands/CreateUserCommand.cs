using Remlore.Application.Common.Commands;

namespace Remlore.Application.User
{
    public class CreateUserCommand : CreateCommand<CreateUserRequest, bool>
    {
    }

    public class CreateUserRequest
    {
        public required string RemloreId { get; set; }
    }
}
