using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using OpenIddict.Abstractions;
using OpenIddict.Server.AspNetCore;
using System.Text.Json;

namespace Remlore.Identity.Areas.Identity.Pages.Account
{
    public class ConsentModel(IOpenIddictApplicationManager _applicationManager) : PageModel
    {
        public string ApplicationName { get; set; } = default!;
        public string Scope { get; set; } = default!;
        public required Dictionary<string, string> Parameters { get; set; }

        public async Task<IActionResult> OnGetAsync()
        {
            if (TempData["OidcRequest"] is not string rawParams)
                return BadRequest("OIDC parameters missing");

            var temp = JsonSerializer.Deserialize<Dictionary<string, string[]>>(rawParams)!;
            var parameters = temp.ToDictionary(kvp => kvp.Key, kvp => kvp.Value.FirstOrDefault());
            var clientId = parameters["client_id"];
            Scope = parameters["scope"];
            Parameters = parameters;

            var app = await _applicationManager.FindByClientIdAsync(clientId);
            ApplicationName = await _applicationManager.GetLocalizedDisplayNameAsync(app) ?? "Unknown";

            return Page();
        }

        //public async Task<IActionResult> OnPostAsync(string submit)
        //{
        //    // Save user's consent decision somehow...
        //    // Then redirect back to ~/connect/authorize

        //    if (submit == "Accept")
        //    {
        //        // Redirect to the original /connect/authorize endpoint
        //        var parameters = TempData["OidcRequest"] as string;
        //        var queryBuilder = new QueryBuilder(JsonSerializer.Deserialize<Dictionary<string, string>>(parameters!)!);

        //        return Redirect("/connect/authorize?" + queryBuilder.ToQueryString());
        //    }

        //    return Forbid(OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
        //}
    }
}
