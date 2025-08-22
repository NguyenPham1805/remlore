using AutoMapper;
using MediatR;
using Remlore.Application.Common;
using Remlore.Domain.Interfaces;

namespace Remlore.Application.User
{
    public class GetUsersQueryHandler(IMapper _mapper, IUserRepository _userRepository) : IRequestHandler<GetUsersQuery, Pagination<UserDto>>
    {
        public async Task<Pagination<UserDto>> Handle(GetUsersQuery request, CancellationToken cancellationToken)
        {
            var users = await _userRepository.GetAllUsersAsync(
                request.Keyword,
                request.SortBy,
                request.IsDescending,
                (request.PageNumber - 1) * request.PageSize,
                request.PageSize,
                cancellationToken
            );
            var userDtos = _mapper.Map<IQueryable<UserDto>>(users);

            // Assuming Pagination is a class that takes a list of items and paginates them
            var paginatedUsers = await Pagination<UserDto>.CreateAsync(userDtos, request.PageNumber, request.PageSize);

            return paginatedUsers;
        }
    }
}
