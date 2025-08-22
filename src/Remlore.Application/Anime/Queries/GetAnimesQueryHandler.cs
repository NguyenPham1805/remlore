using AutoMapper;
using MediatR;
using Remlore.Domain.Interfaces;

namespace Remlore.Application.Anime
{
    public class GetAnimesQueryHandler(IAnimeRepository _animeRepository, IMapper _mapper) : IRequestHandler<GetAnimesQuery, ICollection<AnimeDto>>
    {
        public async Task<ICollection<AnimeDto>> Handle(GetAnimesQuery request, CancellationToken cancellationToken)
        {
            var animes = await _animeRepository.GetAnimesAsync();
            return _mapper.Map<ICollection<AnimeDto>>(animes);
        }
    }
}
