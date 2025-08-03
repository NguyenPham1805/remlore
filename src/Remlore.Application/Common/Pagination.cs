using Microsoft.EntityFrameworkCore;

namespace Remlore.Application.Common
{
    public class Pagination<T>(List<T> items, int count, int pageIndex, int pageSize)
    {
        public int PageIndex { get; private set; } = pageIndex;
        public int TotalPages { get; private set; } = (int)Math.Ceiling(count / (double)pageSize);
        public int TotalItems { get; private set; } = count;
        public List<T> Items { get; private set; } = items;

        public static async Task<Pagination<T>> CreateAsync(IQueryable<T> source, int pageIndex, int pageSize)
        {
            var count = source.Count();
            var items = await source
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new Pagination<T>(items, count, pageIndex, pageSize);
        }
    }
}
