using AutoMapper;
using Remlore.Identity.Data;
using Remlore.Identity.Models.User;

namespace Remlore.Identity
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<RemloreIdsUser, UserDto>();
            CreateMap<UserDto, RemloreIdsUser>();
        }
    }
}
