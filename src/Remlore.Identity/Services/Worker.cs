using OpenIddict.Abstractions;
using Remlore.Identity.Data;
using static OpenIddict.Abstractions.OpenIddictConstants;

namespace Remlore.Identity.Services
{
    public class Worker(IServiceProvider _serviceProvider) : IHostedService
    {
        public async Task StartAsync(CancellationToken cancellationToken)
        {
            using var scope = _serviceProvider.CreateScope();

            var context = scope.ServiceProvider.GetRequiredService<RemloreIdentityDbContext>();
            await context.Database.EnsureCreatedAsync(cancellationToken);

            var manager = scope.ServiceProvider.GetRequiredService<IOpenIddictApplicationManager>();
            var scopeManager = scope.ServiceProvider.GetRequiredService<IOpenIddictScopeManager>(); // Add scope manager

            // Ensure 'remlore_api' scope exists
            if (await scopeManager.FindByNameAsync("remlore_api") == null)
            {
                await scopeManager.CreateAsync(new OpenIddictScopeDescriptor
                {
                    Name = "remlore_api",
                    DisplayName = "Remlore API access",
                    Resources = { "remlore_api_resource" } // Optional: Link to a resource
                });
            }

            if (await manager.FindByClientIdAsync("remlore_api") == null)
            {
                await manager.CreateAsync(new OpenIddictApplicationDescriptor
                {
                    ClientId = "remlore_api",
                    ClientSecret = "super_secret",
                    DisplayName = "My API App",
                    RedirectUris = { new Uri("https://localhost:5000/swagger/index.html") },
                    Permissions =
                    {
                        Permissions.Endpoints.Token,
                        Permissions.GrantTypes.ClientCredentials,
                        Permissions.Prefixes.Scope + "openid", // Added openid scope for client credentials
                        Permissions.Prefixes.Scope + "remlore_api" // Allow this client to request remlore_api scope
                    }
                });
            }

            if (await manager.FindByClientIdAsync("remlore_swagger_api") == null)
            {
                await manager.CreateAsync(new OpenIddictApplicationDescriptor
                {
                    ClientId = "remlore_swagger_api",
                    ClientSecret = "super_secret",
                    DisplayName = "Swagger UI",
                    ConsentType = ConsentTypes.Explicit,
                    // IMPORTANT: This RedirectUri MUST match the URL where your API App's Swagger UI is running,
                    // specifically the oauth2-redirect.html endpoint.
                    RedirectUris = { new Uri("https://localhost:5000/swagger/oauth2-redirect.html") },
                    Permissions =
                    {
                        Permissions.Endpoints.Authorization,
                        Permissions.Endpoints.Token,
                        Permissions.GrantTypes.AuthorizationCode,
                        Permissions.ResponseTypes.Code,
                        Permissions.Scopes.Profile,
                        Permissions.Prefixes.Scope + "openid",
                        Permissions.Prefixes.Scope + "email",
                        Permissions.Prefixes.Scope + "remlore_api" // Allow Swagger UI to request the remlore_api scope
                    },
                    //Requirements =
                    //{
                    //    Requirements.Features.ProofKeyForCodeExchange
                    //}
                });
            }

            if (await manager.FindByClientIdAsync("mvc") == null)
            {
                await manager.CreateAsync(new OpenIddictApplicationDescriptor
                {
                    ClientId = "mvc",
                    ClientSecret = "901564A5-E7FE-42CB-B10D-61EF6A8F3654",
                    ConsentType = ConsentTypes.Explicit,
                    DisplayName = "MVC client application",
                    RedirectUris =
                {
                    new Uri("https://localhost:44338/callback/login/local")
                },
                    PostLogoutRedirectUris =
                {
                    new Uri("https://localhost:44338/callback/logout/local")
                },
                    Permissions =
                {
                    Permissions.Endpoints.Authorization,
                    Permissions.Endpoints.EndSession,
                    Permissions.Endpoints.Token,
                    Permissions.GrantTypes.AuthorizationCode,
                    Permissions.ResponseTypes.Code,
                    Permissions.Scopes.Email,
                    Permissions.Scopes.Profile,
                    Permissions.Scopes.Roles,
                    Permissions.Prefixes.Scope + "remlore_api" // Allow MVC client to request remlore_api scope
                },
                    Requirements =
                {
                    Requirements.Features.ProofKeyForCodeExchange
                }
                });
            }
        }

        public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;
    }
}