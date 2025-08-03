using AutoMapper;

namespace Remlore.Application.Anime
{
    public class AnimeProfile : Profile
    {
        public AnimeProfile()
        {
            CreateMap<CreateAnimeRequest, Remlore.Domain.Entities.Anime>();
            CreateMap<Remlore.Domain.Entities.Anime, AnimeDto>();
        }
    }
}
