
namespace Remlore.Identity.Apis
{
    public static class RemloreIdsApi
    {
        public static IEndpointRouteBuilder MapRemloreIdsApi(this IEndpointRouteBuilder builder)
        {
            builder
                .MapUserApi()
                .MapRoleApi();

            return builder;
        }
    }
}
