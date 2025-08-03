using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using Remlore.Identity.Data;
using Remlore.Identity.Models;
using Remlore.Identity.Services;
using static OpenIddict.Abstractions.OpenIddictConstants;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<RemloreIdentityDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("RemloreIdsConnection"));
    options.UseOpenIddict();
});

builder.Services.AddIdentity<RemloreIdsUser, IdentityRole>(options =>
                {
                    options.User.RequireUniqueEmail = true;

                    options.Password.RequireDigit = false; // Không bắt phải có số
                    options.Password.RequireLowercase = false; // Không bắt phải có chữ thường
                    options.Password.RequireNonAlphanumeric = false; // Không bắt ký tự đặc biệt
                    options.Password.RequireUppercase = false; // Không bắt buộc chữ in
                    options.Password.RequiredLength = 3; // Số ký tự tối thiểu của password
                    options.Password.RequiredUniqueChars = 1; // Số ký tự riêng biệt

                    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5); // Khóa 5 phút
                    options.Lockout.MaxFailedAccessAttempts = 5; // Thất bại 5 lầ thì khóa
                    options.Lockout.AllowedForNewUsers = true;

                    options.SignIn.RequireConfirmedEmail = true;
                })
                .AddEntityFrameworkStores<RemloreIdentityDbContext>()
                .AddDefaultTokenProviders();

builder.Services.AddOpenIddict()
                .AddCore(options =>
                {
                    options.UseEntityFrameworkCore()
                        .UseDbContext<RemloreIdentityDbContext>();
                })
                .AddServer(options =>
                {
                    options
                        .SetEndSessionEndpointUris("connect/logout")
                        .SetAuthorizationEndpointUris("connect/authorize")
                        .SetTokenEndpointUris("connect/token")
                        .SetUserInfoEndpointUris("connect/user-info");

                    options.DisableAccessTokenEncryption();
                    options.RegisterScopes(Scopes.Email, Scopes.Profile, Scopes.Roles);

                    options
                        .AllowAuthorizationCodeFlow();
                    //.RequireProofKeyForCodeExchange();

                    options
                        .AddDevelopmentEncryptionCertificate()
                        .AddDevelopmentSigningCertificate();

                    options.UseAspNetCore()
                        .EnableAuthorizationEndpointPassthrough()
                        .EnableTokenEndpointPassthrough()
                        .EnableStatusCodePagesIntegration();
                })
                .AddValidation(options =>
                {
                    options.UseLocalServer();
                    options.UseAspNetCore();
                });

builder.Services.AddControllers();
builder.Services.AddControllersWithViews();

builder.Services.AddRazorPages(options =>
{
    options.Conventions.AddAreaFolderRouteModelConvention("Identity", "/Account/", model =>
    {
        foreach (var selector in model.Selectors)
        {
            var attributeRouteModel = selector.AttributeRouteModel;
            if (attributeRouteModel != null)
            {
                attributeRouteModel.Order = -1;
                attributeRouteModel.Template = attributeRouteModel.Template!["Identity".Length..];
            }
        }
    });
});

builder.Services.AddHostedService<Worker>();

// Configure CORS for API access (crucial for Swagger UI and other clients)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder
            .WithOrigins(
                "https://localhost:5000",
                "https://localhost:5001",
                "https://localhost:5002",
                "https://localhost:44338"
            )
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials());
});

builder.Services.AddTransient<AuthorizationService>();
builder.Services.AddTransient<IEmailSender, EmailSenderService>();

builder.Services.Configure<SendMailSettings>(builder.Configuration.GetSection(SendMailSettings.Section));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
    app.UseDeveloperExceptionPage();
}

app.UseForwardedHeaders();

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors();

app.UseAuthentication();
app.UseAuthorization();

app.MapStaticAssets();

app.MapControllers();
app.MapDefaultControllerRoute();
app.MapRazorPages();

app.Run();

