using Remlore.Application.Common.Commands;

namespace Remlore.Application.Anime
{
    public class CreateAnimeCommand : CreateCommand<CreateAnimeRequest, bool>
    {
    }

    public class CreateAnimeRequest
    {
        public required string AnilistId { get; set; }
    }
}
