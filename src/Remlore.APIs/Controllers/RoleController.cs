using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Remlore.Application.Role;

namespace Remlore.APIs.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class RoleController(IMediator _mediator) : RemloreControllerBase(_mediator)
    {
        [HttpGet]
        public async Task<IActionResult> GetRoles([FromQuery] GetRolesQuery query)
            => await HandleRequest(query);

        [HttpPost]
        public async Task<IActionResult> CreateRole(CreateRoleCommand command)
            => await HandleRequest(command);
    }
}