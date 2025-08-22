using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Remlore.Application.Common.Commands
{
    public abstract class DeleteCommand<TId, TResponse> : IRequest<TResponse>
    {
        [FromRoute]
        public required TId Id { get; set; }
    }
}
