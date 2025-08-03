using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Remlore.Application.Common.Commands
{
    public abstract class CreateCommand<TRequest, TResponse> : IRequest<TResponse>
    {
        [FromBody]
        public required TRequest Body { get; set; }
    }
}
