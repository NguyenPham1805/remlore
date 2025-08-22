using AutoMapper;
using AnimeEntity = Remlore.Domain.Entities.Anime;

namespace Remlore.Application.Anime
{
    public class AnimeProfile : Profile
    {
        public AnimeProfile()
        {
            CreateMap<CreateAnimeRequest, AnimeEntity>();
            CreateMap<AnimeEntity, AnimeDto>();
        }
    }
}
