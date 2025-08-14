using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Remlore.Application.User;

namespace Remlore.APIs.Controllers
{
    [ApiController]
    [Route("api/user")]
    [Authorize]
    public class UserController(IMediator _mediator) : RemloreBaseController(_mediator)
    {
        [HttpGet]
        public async Task<IActionResult> GetUsers([FromQuery] GetUsersQuery query)
            => await HandleRequest(query);

        [HttpGet("me")]
        public async Task<IActionResult> GetCurrentUser()
            => await HandleRequest(new GetCurrentUserQuery());

        [HttpPost("create-account")]
        public async Task<IActionResult> CreateAccount(CreateUserCommand command)
            => await HandleRequest(command);

        [HttpPatch]
        public async Task<IActionResult> UpdateUser(UpdateUserCommand command)
            => await HandleRequest(command);
    }
}