using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Remlore.Application.Common.Queries
{
    public abstract record GetQuery<TId, TResponse> : IRequest<TResponse>
    {
        [FromRoute]
        public required TId Id { get; set; }
    }

    public abstract record GetQuery<TResponse> : IRequest<TResponse>
    {
    }
}
