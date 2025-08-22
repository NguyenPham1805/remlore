using Remlore.Application.Common.Queries;

namespace Remlore.Application.Anime
{
    public record GetAnimesQuery : GetQuery<ICollection<AnimeDto>>
    {
    }
}
