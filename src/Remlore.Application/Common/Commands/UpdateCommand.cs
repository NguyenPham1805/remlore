using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Remlore.Application.Common.Commands
{
    public abstract class UpdateCommand<TId, TBody, TResponse> : IRequest<TResponse>
    {
        [FromRoute]
        public required TId Id { get; set; }

        [FromBody]
        public required TBody Body { get; set; }
    }

    public abstract class UpdateCommand<TId, TResponse> : IRequest<TResponse>
    {
        [FromRoute]
        public required TId Id { get; set; }
    }
}
