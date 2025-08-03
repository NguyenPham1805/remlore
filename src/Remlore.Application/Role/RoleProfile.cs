using AutoMapper;
using Microsoft.AspNetCore.Identity;

namespace Remlore.Application.Role
{
    public class RoleProfile : Profile
    {
        public RoleProfile()
        {
            CreateMap<IdentityRole, RoleDto>();
        }
    }
}
