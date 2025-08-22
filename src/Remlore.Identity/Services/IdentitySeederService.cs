using Remlore.Identity.Seeds;

namespace Remlore.Identity.Services
{
    public class IdentitySeederService(IServiceScopeFactory _scopeFactory) : IHostedService
    {
        public async Task StartAsync(CancellationToken cancellationToken)
        {
            using var scope = _scopeFactory.CreateScope();
            var seeder = scope.ServiceProvider.GetRequiredService<IdentitySeeder>();

            await seeder.SeedAdminAsync(scope.ServiceProvider);
        }

        public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;
    }
}
