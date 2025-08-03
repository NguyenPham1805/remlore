using AutoMapper;
using MediatR;
using Remlore.Domain.Interfaces;

namespace Remlore.Application.Anime
{
    public class CreateAnimeCommandHandler(IAnimeRepository _animeRepository, IMapper _mapper) : IRequestHandler<CreateAnimeCommand, bool>
    {
        public async Task<bool> Handle(CreateAnimeCommand request, CancellationToken cancellationToken)
        {
            var newAnime = _mapper.Map<Domain.Entities.Anime>(request.Body);
            var result = await _animeRepository.CreateAnimeAsync(newAnime, cancellationToken);

            return result;
        }
    }
}
