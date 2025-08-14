using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using Remlore.Domain.Interfaces;

namespace Remlore.Application.User
{
    internal class GetCurrentUserQueryHandler(IUserRepository _userRepository, IMapper _mapper, IHttpContextAccessor _httpContext) : IRequestHandler<GetCurrentUserQuery, UserDto>
    {
        public async Task<UserDto> Handle(GetCurrentUserQuery request, CancellationToken cancellationToken)
        {
            var claims = _httpContext.HttpContext?.User;
            var sub = claims?.FindFirst("sub")?.Value;

            if (string.IsNullOrEmpty(sub))
            {
                throw new UnauthorizedAccessException("User is not authenticated.");
            }

            var user = await _userRepository.GetUserBySubAsync(sub, cancellationToken);

            if (user == null)
            {
                throw new BadHttpRequestException("User not register!");
            }

            return _mapper.Map<UserDto>(user);
        }
    }
}
