using MediatR;
using Microsoft.AspNetCore.Mvc;
using Remlore.Application.Post;

namespace Remlore.APIs.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostController(IMediator _mediator) : RemloreControllerBase(_mediator)
    {
        [HttpGet]
        public async Task<IActionResult> GetPosts([FromQuery] GetPostsQuery query)
            => await HandleRequest(query);

        [HttpPost]
        public async Task<IActionResult> CreatePost(CreatePostCommand command)
            => await HandleRequest(command);
    }
}
