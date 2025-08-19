namespace Remlore.APIs.Apis
{
    public static class RemloreApi
    {
        public static IEndpointRouteBuilder MapRemloreApi(this IEndpointRouteBuilder builder)
        {
            // Register all APIs
            builder.MapUserApi();
            builder.MapPostApi();
            builder.MapAnimeApi();

            return builder;
        }
    }
}
