using MediatR;

namespace Remlore.Application.Post
{
    public class CreatePostCommandHandler(/* IPostRepository _postRepository, IMapper _mapper */) : IRequestHandler<CreatePostCommand, bool>
    {
        public async Task<bool> Handle(CreatePostCommand request, CancellationToken cancellationToken)
        {
            return await Task.FromResult(true);
        }
    }
}
