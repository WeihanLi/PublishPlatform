using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using PublishPlatform.Api.Business;
using PublishPlatform.Api.Database;
using PublishPlatform.Api.Services;
using System;
using System.IO;
using WeihanLi.Common;
using WeihanLi.Common.Helpers;
using WeihanLi.EntityFramework;

namespace PublishPlatform.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<PubDbContext>(options =>
            {
                options.UseInMemoryDatabase("Pubs");
            });
            services.AddEFRepository();

            var secretKey = Configuration.GetAppSetting("TokenSecretKey");
            var tokenAudience = Configuration.GetAppSetting("TokenAudience");
            var tokenIssuer = Configuration.GetAppSetting("TokenIssuer");
            var tokenValidFor = Configuration.GetAppSetting<TimeSpan>("TokenValidFor");

            var signingKey = new SymmetricSecurityKey(System.Text.Encoding.ASCII.GetBytes(secretKey));
            services.Configure<ViewModels.TokenOptions>(options =>
            {
                options.Audience = tokenAudience;
                options.Issuer = tokenIssuer;
                options.ValidFor = tokenValidFor;
                options.SigningCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
            });

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        // The signing key must match!
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = signingKey,
                        // Validate the JWT Issuer (iss) claim
                        ValidateIssuer = true,
                        ValidIssuer = tokenIssuer,
                        // Validate the JWT Audience (aud) claim
                        ValidateAudience = true,
                        ValidAudience = tokenAudience,
                        // Validate the token expiry
                        ValidateLifetime = true,
                        // If you want to allow a certain amount of clock drift, set that here:
                        ClockSkew = TimeSpan.FromMinutes(5)
                    };
                });

            services.AddControllers()
                .AddNewtonsoftJson(options =>
                    {
                        options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                        options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
                    });
            services.AddSwaggerGen(option =>
            {
                option.SwaggerDoc(ApplicationHelper.ApplicationName, new OpenApiInfo
                {
                    Version = "v1",
                    Title = "XX项目发布平台 API",
                    Description = "API for PublishPlatform",
                    Contact = new OpenApiContact() { Name = "WeihanLi", Email = "weihanli@outlook.com" }
                });

                // include document file
                option.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, $"{typeof(Startup).Assembly.GetName().Name}.xml"), true);

                // bearer auth
                option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
                {
                    Description = "Please enter into field the word 'Bearer' followed by a space and the JWT value",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                });
                option.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    { new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference()
                        {
                            Id = "Bearer",
                            Type = ReferenceType.SecurityScheme
                        }
                    }, Array.Empty<string>() }
                });
            });

            services.TryAddSingleton<ITokenGenerator, TokenGenerator>();

            DependencyResolver.SetDependencyResolver(services);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.ApplicationServices.InitData();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles();
            app.UseSwagger()
                .UseSwaggerUI(options =>
                {
                    options.SwaggerEndpoint($"/swagger/{ApplicationHelper.ApplicationName}/swagger.json", ApplicationHelper.ApplicationName);
                    options.RoutePrefix = string.Empty;
                    options.DocumentTitle = "发布平台 API";
                });

            app.UseRouting();
            app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}