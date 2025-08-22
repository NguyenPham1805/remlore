using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Remlore.Application.Common.Commands
{
    public abstract class CreateCommand<TBody, TResponse> : IRequest<TResponse>
    {
        [FromBody]
        public required TBody Body { get; set; }
    }
}
