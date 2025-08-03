using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Remlore.Application.Role.Queries
{
    public class GetRolesQueryHandler(IMapper _mapper, RoleManager<IdentityRole> _roleManager) : IRequestHandler<GetRolesQuery, ICollection<RoleDto>>
    {
        public async Task<ICollection<RoleDto>> Handle(GetRolesQuery request, CancellationToken cancellationToken)
        {
            var roles = await _roleManager.Roles.ToListAsync(cancellationToken);

            if (roles == null)
            {
                return [];
            }

            return _mapper.Map<ICollection<RoleDto>>(roles);
        }
    }
}
