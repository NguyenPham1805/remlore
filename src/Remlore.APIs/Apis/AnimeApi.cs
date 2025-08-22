using MediatR;
using Remlore.Application.Anime;

namespace Remlore.APIs.Apis
{
    public static class AnimeApi
    {
        public static IEndpointRouteBuilder MapAnimeApi(this IEndpointRouteBuilder builder)
        {
            var vApi = builder.NewVersionedApi("Anime");
            var v1 = vApi.MapGroup("api/v{version:apiVersion}/anime")
                .HasApiVersion(1, 0);

            v1.MapGet("/", async (IMediator mediator, [AsParameters] GetAnimesQuery query) => await mediator.Send(query));
            //v1.MapGet("/{id}", async (IMediator mediator, Guid id) => await mediator.Send(new GetAnimeByIdQuery(id)));
            v1.MapPost("/", async (IMediator mediator, [AsParameters] CreateAnimeCommand command) => await mediator.Send(command));
            //v1.MapPatch("/{id}", async (IMediator mediator, Guid id, UpdateAnimeCommand command) => await mediator.Send(command with { Id = id }));
            //v1.MapDelete("/{id}", async (IMediator mediator, Guid id) => await mediator.Send(new DeleteAnimeCommand(id)));
            return builder;
        }
    }
}
