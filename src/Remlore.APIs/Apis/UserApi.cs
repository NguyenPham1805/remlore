using MediatR;
using Remlore.Application.User;

namespace Remlore.APIs.Apis
{
    public static class UserApi
    {
        public static IEndpointRouteBuilder MapUserApi(this IEndpointRouteBuilder builder)
        {
            var vApi = builder.NewVersionedApi("User");
            var v1 = vApi.MapGroup("api/v{version:apiVersion}/user")
                .HasApiVersion(1, 0);

            v1.MapGet("/", async (IMediator mediator, [AsParameters] GetUsersQuery query) => await mediator.Send(query));
            v1.MapGet("/me", async (IMediator mediator) => await mediator.Send(new GetCurrentUserQuery()));
            v1.MapPost("/create-account", async (IMediator mediator, [AsParameters] CreateUserCommand command) => await mediator.Send(command));
            v1.MapPatch("/{id:int}", async (IMediator mediator, int id, [AsParameters] UpdateUserCommand command) =>
            {
                command.Id = id;
                return await mediator.Send(command);
            });

            return builder;
        }
    }
}
