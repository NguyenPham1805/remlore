using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Remlore.Application.Common.Queries
{
    public abstract class GetQuery<TId, TResponse> : IRequest<TResponse>
    {
        [FromRoute]
        public required TId Id { get; set; }
    }

    public abstract class GetQuery<TResponse> : IRequest<TResponse>
    {
    }
}
