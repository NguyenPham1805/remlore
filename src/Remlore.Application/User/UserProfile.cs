using AutoMapper;
using UserEntity = Remlore.Domain.Entities.User;

namespace Remlore.Application.User
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<UserDto, UserEntity>();
            CreateMap<UpdateUserDto, UserEntity>();

            CreateMap<UserEntity, UserDto>();
            CreateMap<UserEntity, UpdateUserDto>();
        }
    }
}
