using MediatR;
using Microsoft.AspNetCore.Mvc;
using Remlore.Application.Anime;

namespace Remlore.APIs.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AnimeController(IMediator _mediator) : RemloreControllerBase(_mediator)
    {
        [HttpGet]
        public async Task<IActionResult> GetAnimes(GetAnimesQuery query)
            => await HandleRequest(query);

        [HttpPost]
        public async Task<IActionResult> CreateAnime(CreateAnimeCommand command)
            => await HandleRequest(command);
    }
}
