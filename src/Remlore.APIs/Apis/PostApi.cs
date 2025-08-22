using MediatR;
using Remlore.Application.Post;

namespace Remlore.APIs.Apis
{
    public static class PostApi
    {
        public static IEndpointRouteBuilder MapPostApi(this IEndpointRouteBuilder builder)
        {
            var vApi = builder.NewVersionedApi("Post");
            var v1 = vApi.MapGroup("api/v{version:apiVersion}/post")
                .HasApiVersion(1, 0);

            v1.MapGet("/", async (IMediator mediator, [AsParameters] GetPostsQuery query) => await mediator.Send(query));
            //v1.MapGet("/{id}", async (IMediator mediator, Guid id) => await mediator.Send(new GetPostByIdQuery(id)));
            v1.MapPost("/", async (IMediator mediator, [AsParameters] CreatePostCommand command) => await mediator.Send(command));
            //v1.MapPatch("/{id}", async (IMediator mediator, Guid id, UpdatePostCommand command) => await mediator.Send(command with { Id = id }));
            //v1.MapDelete("/{id}", async (IMediator mediator, Guid id) => await mediator.Send(new DeletePostCommand(id)));
            return builder;
        }
    }
}
