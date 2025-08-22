using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Remlore.Identity.Apis;
using Remlore.Identity.Data;
using Remlore.Identity.Models.User;

namespace Remlore.Identity.UnitTest
{
    public class UserUnitTest
    {
        private SqliteConnection _sqliteConnection;
        private DbContextOptions<RemloreIdentityDbContext> _dbContextOptions;

        //public UserUnitTest()
        //{
        //    _sqliteConnection = new SqliteConnection("DataSource=:memory:");
        //    _sqliteConnection.Open();
        //    _dbContextOptions = new DbContextOptionsBuilder<RemloreIdentityDbContext>()
        //        .UseSqlite(_sqliteConnection)
        //        .Options;
        //}

        [Fact]
        public async Task GetAllUsers_ReturnsPagedUsers()
        {
            // Arrange: Use an in-memory SQLite database
            _sqliteConnection = new SqliteConnection("DataSource=:memory:");
            _sqliteConnection.Open();
            _dbContextOptions = new DbContextOptionsBuilder<RemloreIdentityDbContext>()
                .UseSqlite(_sqliteConnection)
                .Options;

            // Create a service collection and register all necessary services
            var services = new ServiceCollection();

            // 1. Add Logging services
            services.AddLogging(); // This is the key fix for the ILogger dependency

            // 2. Add DbContext
            services.AddDbContext<RemloreIdentityDbContext>(options => options.UseSqlite(_sqliteConnection));

            // 3. Add Identity with Entity Framework stores
            services.AddIdentity<RemloreIdsUser, IdentityRole>()
                .AddEntityFrameworkStores<RemloreIdentityDbContext>()
                .AddDefaultTokenProviders();

            // 4. Add AutoMapper (assuming you have a mapping profile)
            services.AddAutoMapper(cfg => { }, typeof(MappingProfile));

            var serviceProvider = services.BuildServiceProvider();

            using (var scope = serviceProvider.CreateScope())
            {
                var scopedServiceProvider = scope.ServiceProvider;
                var context = scopedServiceProvider.GetRequiredService<RemloreIdentityDbContext>();
                var userManager = scopedServiceProvider.GetRequiredService<UserManager<RemloreIdsUser>>();
                var mapper = scopedServiceProvider.GetRequiredService<IMapper>();

                // Ensure the database is created
                await context.Database.EnsureCreatedAsync();

                // Seed users
                var usersList = new List<RemloreIdsUser>
                {
                    new() { UserName = "alice@test.com", Id = "1", DisplayName = "Alice", Email = "alice@test.com", CreatedAt = DateTime.UtcNow.AddDays(-2) },
                    new() { UserName = "bob@test.com", Id = "2", DisplayName = "Bob", Email = "bob@test.com", CreatedAt = DateTime.UtcNow.AddDays(-1) }
                };

                foreach (var user in usersList)
                {
                    await userManager.CreateAsync(user, "Password123!");
                }

                var request = new GetUsersRequest
                {
                    PageIndex = 1,
                    PageSize = 10,
                    Keyword = "",
                    SortBy = "DisplayName",
                    IsDescending = false
                };

                // Act
                var result = await UserApi.GetAllUsers(userManager, mapper, request);

                // Assert
                var okResult = Assert.IsType<Ok<GetUsersResponse>>(result);
                var response = okResult.Value;

                Assert.NotNull(response);
                Assert.Equal(2, response.TotalItems);
                Assert.Equal(1, response.PageIndex);
                Assert.Equal(10, response.PageSize);
                Assert.Equal(2, response.Users.Count);
                Assert.Equal("Alice", response.Users.First().DisplayName);
            }
        }
    }
}
