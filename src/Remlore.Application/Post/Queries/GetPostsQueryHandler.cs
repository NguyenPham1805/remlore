using MediatR;

namespace Remlore.Application.Post
{
    public class GetPostsQueryHandler : IRequestHandler<GetPostsQuery, ICollection<PostDto>>
    {
        public async Task<ICollection<PostDto>> Handle(GetPostsQuery request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException("This method is not implemented yet.");
        }
    }
}
