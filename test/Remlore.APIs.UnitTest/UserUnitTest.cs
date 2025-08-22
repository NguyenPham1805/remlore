using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Moq;
using Remlore.Application.User;
using Remlore.Domain.Entities;
using Remlore.Domain.Interfaces;

namespace Remlore.APIs.UnitTest
{
    public class UserUnitTest
    {
        [Fact]
        public async Task Handle_ShouldReturnUserDto_WhenUserIsAuthenticated()
        {
            // Arrange
            var sub = "12345"; // fake "sub" claim from JWT
            var user = new User { Sub = sub, RemloreId = "", Email = "test@email.com", DisplayName = "John Doe" };

            // Mock repository
            var userRepoMock = new Mock<IUserRepository>();
            userRepoMock.Setup(r => r.GetUserBySubAsync(sub, It.IsAny<CancellationToken>()))
                .ReturnsAsync(user);

            // Mock HttpContext with ClaimsPrincipal
            var claims = new ClaimsPrincipal(new ClaimsIdentity(
            [
                new Claim("sub", sub)
            ], "mock"));

            var httpContext = new DefaultHttpContext { User = claims };
            var httpContextAccessor = new Mock<IHttpContextAccessor>();
            httpContextAccessor.Setup(x => x.HttpContext).Returns(httpContext);

            // Mock AutoMapper
            var mapperMock = new Mock<IMapper>();
            var userDto = new UserDto
            {
                Email = user.Email,
                DisplayName = user.DisplayName
            };
            mapperMock.Setup(m => m.Map<UserDto>(user))
                .Returns(userDto);

            var handler = new GetCurrentUserQueryHandler(
                userRepoMock.Object,
                mapperMock.Object,
                httpContextAccessor.Object
            );

            // Act
            var result = await handler.Handle(new GetCurrentUserQuery(), CancellationToken.None);

            // Assert
            Assert.Equal(user.Email, result.Email);
            Assert.Equal(user.DisplayName, result.DisplayName);
        }

        [Fact]
        public async Task Handle_ShouldThrowUnauthorized_WhenNoUserClaim()
        {
            // Arrange
            var userRepoMock = new Mock<IUserRepository>();
            var mapperMock = new Mock<IMapper>();
            var httpContextAccessor = new Mock<IHttpContextAccessor>();
            httpContextAccessor.Setup(x => x.HttpContext).Returns(new DefaultHttpContext()); // no claims

            var handler = new GetCurrentUserQueryHandler(
                userRepoMock.Object,
                mapperMock.Object,
                httpContextAccessor.Object
            );

            // Act & Assert
            await Assert.ThrowsAsync<UnauthorizedAccessException>(() =>
                handler.Handle(new GetCurrentUserQuery(), CancellationToken.None));
        }
    }
}
