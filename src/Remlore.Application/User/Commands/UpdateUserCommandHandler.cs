using AutoMapper;
using MediatR;
using Remlore.Domain.Interfaces;

namespace Remlore.Application.User
{
    public class UpdateUserCommandHandler(IUserRepository _userRepository, IMapper _mapper) : IRequestHandler<UpdateUserCommand, bool>
    {
        public async Task<bool> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetUserByIdAsync(request.Id, cancellationToken)
                ?? throw new KeyNotFoundException("User not found.");


            _mapper.Map(request.Body, user);

            var result = await _userRepository.UpdateUserAsync(user, cancellationToken);
            return result;
        }
    }
}
