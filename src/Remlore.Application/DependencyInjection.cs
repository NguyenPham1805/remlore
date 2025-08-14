using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using OpenIddict.Validation.AspNetCore;
using System.Reflection;

namespace Remlore.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            var assembly = Assembly.GetExecutingAssembly();

            services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(assembly));
            services.AddAutoMapper(cfg => { }, assembly);
            services.AddValidatorsFromAssembly(assembly);
            services.AddEndpointsApiExplorer();
            services.AddSwagger();
            services.AddTransient<IHttpContextAccessor, HttpContextAccessor>();

            services.AddIdentity();

            return services;
        }

        public static IServiceCollection AddIdentity(this IServiceCollection services)
        {
            //services.AddAuthentication(option =>
            //{
            //    option.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            //    option.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
            //})
            //    .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme)
            //    .AddOpenIdConnect(OpenIdConnectDefaults.AuthenticationScheme, options =>
            //    {
            //        options.Authority = "https://localhost:5001";
            //        options.ClientId = "remlore_api";
            //        options.ClientSecret = "super_secret";
            //        options.ResponseType = OpenIdConnectResponseType.Code;
            //        options.SaveTokens = true;
            //        options.GetClaimsFromUserInfoEndpoint = true;
            //        options.SignedOutCallbackPath = "/";
            //    })
            //    .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, jwtOptions =>
            //    {
            //        jwtOptions.Authority = "https://localhost:5001"; // Your IDS App's URL
            //        jwtOptions.Audience = "remlore_api"; // The audience your API expects
            //        jwtOptions.TokenValidationParameters = new TokenValidationParameters
            //        {
            //            ValidateAudience = true,
            //            ValidateIssuer = true,
            //            ValidateLifetime = true,
            //            ValidateIssuerSigningKey = true,
            //            ValidIssuer = "https://localhost:5001",
            //            ValidAudience = "remlore_api"
            //        };
            //    });

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme;
            });
            services.AddOpenIddict()
                .AddValidation(options =>
                {
                    options.SetIssuer("https://localhost:5001/");
                    options.UseSystemNetHttp();
                    options.UseAspNetCore();

                    options.SetClientId("remlore_api");
                    options.SetClientSecret("super_secret");
                });

            return services;
        }

        public static IServiceCollection AddSwagger(this IServiceCollection services)
        {
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "Remlore API",
                    Version = "v1",
                    Description = "API for Remlore application"
                });

                // Define the OAuth2 security scheme for Swagger UI
                c.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
                {
                    Type = SecuritySchemeType.OAuth2,
                    Description = "OpenIddict Authorization Code Flow with PKCE",
                    Flows = new OpenApiOAuthFlows
                    {
                        AuthorizationCode = new OpenApiOAuthFlow
                        {
                            // These URLs MUST point to your IDS App's endpoints
                            AuthorizationUrl = new Uri("https://localhost:5001/connect/authorize"),
                            TokenUrl = new Uri("https://localhost:5001/connect/token"),
                            Scopes = new Dictionary<string, string>
                            {
                                //{ "openid", "Access to your identity" },
                                //{ "profile", "Access to your profile" },
                                //{ "email", "Access to your email" },
                                { "remlore_api", "Access to Remlore API" } // Scope for your API
                            }
                        }
                    },
                });

                // Apply the security requirement globally to all API endpoints in Swagger
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
                        new List<string> { "remlore_api" } // Scopes required for API access
                    }
                });
            });

            return services;
        }
    }
}
