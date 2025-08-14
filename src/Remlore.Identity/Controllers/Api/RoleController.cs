using Microsoft.AspNetCore.Mvc;

namespace Remlore.Identity.Controllers.Api
{
    [Route("api/role")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetRoles()
        {
            // This is a placeholder for the actual implementation.
            // You would typically retrieve roles from your database or identity service.
            var roles = new List<string> { "Administrator", "User", "Guest" };
            return Ok(roles);
        }
    }
}
