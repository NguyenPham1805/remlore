using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Remlore.APIs.Controllers
{
    public abstract class RemloreBaseController(IMediator _mediator) : ControllerBase
    {
        protected async Task<IActionResult> HandleRequest<TResponse>(IRequest<TResponse> request)
            => new OkObjectResult(await _mediator.Send(request));
    }
}
