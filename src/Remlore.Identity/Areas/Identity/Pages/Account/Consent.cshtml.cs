using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using OpenIddict.Abstractions;
using OpenIddict.Server.AspNetCore;

namespace Remlore.Identity.Areas.Identity.Pages.Account
{
    public class ConsentModel : PageModel
    {
        public void OnGet(string returnUrl)
        {
        }

        public async Task<IActionResult> OnPostAsync(string grant, string returnUrl = null)
        {
            returnUrl ??= Url.Content("~/");
            User.SetClaim("consent", grant);

            await HttpContext.SignInAsync(OpenIddictServerAspNetCoreDefaults.AuthenticationScheme, User);
            return Redirect(returnUrl);
        }
    }
}
