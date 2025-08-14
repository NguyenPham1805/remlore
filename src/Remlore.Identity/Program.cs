using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Remlore.Identity.Data;
using Remlore.Identity.Models;
using Remlore.Identity.Seeds;
using Remlore.Identity.Services;
using System.Reflection;
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
                        .AllowAuthorizationCodeFlow()
                        .RequireProofKeyForCodeExchange();

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

builder.Services.AddAutoMapper(cfg => { }, Assembly.GetExecutingAssembly());
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "IDS Admin Api", Version = "v1" });

    // Add security definition
    c.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Type = SecuritySchemeType.OAuth2,
        Flows = new OpenApiOAuthFlows
        {
            AuthorizationCode = new OpenApiOAuthFlow
            {
                AuthorizationUrl = new Uri("https://localhost:5001/connect/authorize"), // IDS authorize endpoint
                TokenUrl = new Uri("https://localhost:5001/connect/token"), // IDS token endpoint
                Scopes = new Dictionary<string, string>
                {
                    { "ids_admin_api", "Access API Admin" },
                }
            }
        }
    });

    // Apply security to all endpoints
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "oauth2"
                }
            },
            new[] { "ids_admin_api" }
        }
    });
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

builder.Services.AddHostedService<WorkerService>();
builder.Services.AddHostedService<IdentitySeederService>();
builder.Services.AddScoped<IdentitySeeder>();

builder.Services.Configure<SendMailSettings>(builder.Configuration.GetSection(SendMailSettings.Section));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");

        // Enable OAuth2 login in Swagger UI
        c.OAuthClientId("swagger-ids-client"); // Must match client in IDS config
        c.OAuthClientSecret("swagger-ids-secret"); // For confidential clients
        c.OAuthUsePkce(); // Recommended for Authorization Code flow
        c.OAuthScopeSeparator(" ");
        c.OAuthScopes("ids_admin_api");
    });
}
//// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
//app.UseHsts();
//app.UseDeveloperExceptionPage();
app.UseExceptionHandler("/Home/Error");

app.UseForwardedHeaders();

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors("AllowSpecificOrigin");

app.UseAuthentication();
app.UseAuthorization();

app.MapStaticAssets();

app.MapControllers();
app.MapDefaultControllerRoute();
app.MapRazorPages();

app.Run();

