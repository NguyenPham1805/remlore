using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Remlore.Application.Role
{
    public class CreateRoleCommandHandler(RoleManager<IdentityRole> _roleManager) : IRequestHandler<CreateRoleCommand, bool>
    {
        public async Task<bool> Handle(CreateRoleCommand request, CancellationToken cancellationToken)
        {
            var newRole = new IdentityRole
            {
                Name = request.Body.Name,
            };

            var result = await _roleManager.CreateAsync(newRole);

            if (result.Succeeded)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
