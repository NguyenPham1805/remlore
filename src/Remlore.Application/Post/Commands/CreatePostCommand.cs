using Remlore.Application.Common.Commands;

namespace Remlore.Application.Post
{
    public class CreatePostCommand : CreateCommand<CreatePostRequest, bool>
    { }

    public class CreatePostRequest
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public string AuthorId { get; set; }
    }
}
