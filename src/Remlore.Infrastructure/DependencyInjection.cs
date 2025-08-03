using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Remlore.Domain;
using Remlore.Domain.Interfaces;
using Remlore.Infrastructure.Repositories;

namespace Remlore.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration config)
        {
            services.AddRepositories();
            services.AddDbContext<RemloreDbContext>(options =>
            {
                var connectionString = config.GetConnectionString("RemloreDbConnection");
                options.UseSqlServer(connectionString);
            });

            return services;
        }

        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            services.AddScoped<IPostRepository, PostRepository>();
            services.AddScoped<IAnimeRepository, AnimeRepository>();

            return services;
        }
    }
}
