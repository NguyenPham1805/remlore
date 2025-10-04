using OpenIddict.Abstractions;
using Remlore.Identity.Data;
using static OpenIddict.Abstractions.OpenIddictConstants;

namespace Remlore.Identity.Services
{
    public class WorkerService(IServiceProvider _serviceProvider) : IHostedService
    {
        public async Task StartAsync(CancellationToken cancellationToken)
        {
            using var scope = _serviceProvider.CreateScope();

            var context = scope.ServiceProvider.GetRequiredService<RemloreIdentityDbContext>();
            await context.Database.EnsureCreatedAsync(cancellationToken);

            var manager = scope.ServiceProvider.GetRequiredService<IOpenIddictApplicationManager>();
            var scopeManager = scope.ServiceProvider.GetRequiredService<IOpenIddictScopeManager>(); // Add scope manager

            // Ensure 'remlore_api' scope exists
            if (await scopeManager.FindByNameAsync("remlore_api", cancellationToken) == null)
            {
                await scopeManager.CreateAsync(new OpenIddictScopeDescriptor
                {
                    Name = "remlore_api",
                    DisplayName = "Remlore API access",
                    Resources = { "remlore_api_resource" } // Optional: Link to a resource
                }, cancellationToken);
            }

            // Ensure 'ids_admin_api' scope exists
            if (await scopeManager.FindByNameAsync("ids_admin_api", cancellationToken) == null)
            {
                await scopeManager.CreateAsync(new OpenIddictScopeDescriptor
                {
                    Name = "ids_admin_api",
                    DisplayName = "Remlore IDS API access",
                    Resources = { "remlore_admin_api_resource" } // Optional: Link to a resource
                }, cancellationToken);
            }

            if (await manager.FindByClientIdAsync("remlore_api", cancellationToken) == null)
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
                }, cancellationToken);
            }

            if (await manager.FindByClientIdAsync("remlore_swagger_api", cancellationToken) == null)
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
                }, cancellationToken);
            }

            if (await manager.FindByClientIdAsync("mvc", cancellationToken) == null)
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
                        Permissions.Prefixes.Scope + "remlore_api", // Allow MVC client to request remlore_api scope
                        Permissions.Prefixes.Scope + Scopes.OfflineAccess
                    },
                    Requirements =
                    {
                        Requirements.Features.ProofKeyForCodeExchange
                    }
                }, cancellationToken);
            }

            if (await manager.FindByClientIdAsync("swagger-ids-client", cancellationToken) == null)
            {
                await manager.CreateAsync(new OpenIddictApplicationDescriptor
                {
                    ClientId = "swagger-ids-client",
                    ClientSecret = "swagger-ids-secret", // Hash in production if needed
                    DisplayName = "Swagger UI For Identity Server",
                    Permissions =
                    {
                        Permissions.Endpoints.Authorization,
                        Permissions.Endpoints.Token,
                        Permissions.GrantTypes.AuthorizationCode,
                        Permissions.GrantTypes.RefreshToken,
                        Permissions.ResponseTypes.Code,
                        Permissions.Scopes.Email,
                        Permissions.Scopes.Profile,
                        Permissions.Scopes.Roles,
                        Permissions.Prefixes.Scope + "ids_admin_api",
                        Permissions.Prefixes.Scope + Scopes.OfflineAccess
                    },
                    RedirectUris = { new Uri("https://localhost:5001/swagger/oauth2-redirect.html") }
                }, cancellationToken);
            }

            if (await manager.FindByClientIdAsync("remlore_admin_app", cancellationToken) == null)
            {
                await manager.CreateAsync(new OpenIddictApplicationDescriptor
                {
                    ClientId = "remlore_admin_app",
                    ClientSecret = "remlore_admin_app_super_secret",
                    DisplayName = "Remlore Admin App",
                    RedirectUris = { new Uri("https://localhost:4200/auth/callback") },
                    PostLogoutRedirectUris = { new Uri("https://localhost:4200/") },
                    Permissions =
                    {
                        Permissions.Endpoints.Authorization,
                        Permissions.Endpoints.Token,
                        Permissions.GrantTypes.AuthorizationCode,
                        Permissions.ResponseTypes.Code,
                        // Allow SPA to request these scopes:
                        Permissions.Scopes.Email,
                        Permissions.Prefixes.Scope + Scopes.OpenId,
                        Permissions.Prefixes.Scope + Scopes.Profile,
                        Permissions.Prefixes.Scope + "ids_admin_api" // Allow this client to request ids_admin_api scope
                    },
                    Requirements =
                    {
                        Requirements.Features.ProofKeyForCodeExchange // PKCE required
                    }
                }, cancellationToken);
            }

            if (await manager.FindByClientIdAsync("remlore_forum", cancellationToken) == null)
            {
                await manager.CreateAsync(new OpenIddictApplicationDescriptor
                {
                    ClientId = "remlore_forum",
                    ClientSecret = "remlore_forum_super_secret",
                    DisplayName = "Remlore Forum App",
                    RedirectUris = { new Uri("https://localhost:3000/auth/callback") },
                    Permissions =
                    {
                        Permissions.Endpoints.Token,
                        Permissions.GrantTypes.ClientCredentials,
                        Permissions.Prefixes.Scope + "ids_admin_api" // Allow this client to request ids_admin_api scope
                    },
                    Requirements =
                    {
                        Requirements.Features.ProofKeyForCodeExchange // PKCE required
                    }
                }, cancellationToken);
            }
        }

        public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;
    }
}
