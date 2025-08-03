using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Remlore.Identity.Data
{
    public class RemloreIdentityDbContext(DbContextOptions<RemloreIdentityDbContext> options) : IdentityDbContext<RemloreIdsUser>(options)
    {
    }
}
