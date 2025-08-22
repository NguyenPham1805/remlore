namespace Remlore.Identity.Models.User
{
    public record GetUsersResponse
    {
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public int TotalPage { get; set; }
        public int TotalItems { get; set; }
        public ICollection<UserDto> Users { get; set; } = [];
    }
}
