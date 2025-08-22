using Remlore.APIs.Apis;
using Remlore.APIs.Services;
using Remlore.Application;
using Remlore.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddApiVersionService();

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "Remlore API V1");
        options.OAuthClientId("remlore_swagger_api");
        options.OAuthClientSecret("super_secret");
        options.OAuthUsePkce();
        options.OAuthUseBasicAuthenticationWithAccessCodeGrant();
    });
}
app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapRemloreApi();

app.Run();
