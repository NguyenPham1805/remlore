using MediatR;
using Microsoft.AspNetCore.Http;
using Remlore.Domain.Interfaces;
using static OpenIddict.Abstractions.OpenIddictConstants;
using UserEntity = Remlore.Domain.Entities.User;

namespace Remlore.Application.User
{
    public class CreateUserCommandHandler(IUserRepository _userRepository, IHttpContextAccessor _httpContext) : IRequestHandler<CreateUserCommand, bool>
    {

        public async Task<bool> Handle(CreateUserCommand request, CancellationToken cancellationToken)
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
                var email = claims?.FindFirst(Claims.Email)?.Value ?? "unknown@example.com";
                var name = claims?.FindFirst("DisplayName")?.Value ?? "Anonymous";
                var avatar = claims?.FindFirst("avatar")?.Value ?? "default.png";

                user = new UserEntity
                {
                    Sub = sub,
                    Email = email,
                    DisplayName = name,
                    AvatarUrl = avatar,
                    RemloreId = request.Body.RemloreId,
                };
            }

            return await _userRepository.AddUserAsync(user, cancellationToken);
        }
    }
}
