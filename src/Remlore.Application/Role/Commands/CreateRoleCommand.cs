using Remlore.Application.Common.Commands;

namespace Remlore.Application.Role
{
    public class CreateRoleCommand : CreateCommand<CreateRoleRequest, bool>
    {
    }

    public class CreateRoleRequest
    {
        public required string Name { get; set; }
    }
}