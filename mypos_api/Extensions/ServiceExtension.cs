using System;
using System.IO;
using System.Reflection;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using mypos_api.Database;

namespace mypos_api.Extensions
{
    public static class ServiceExtension
    {
        public static void ConfigSwagger(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
                           {
                               c.SwaggerDoc("v1", new OpenApiInfo
                               {
                                   Version = "v1",
                                   Title = "ToDo API",
                               });

                               c.SwaggerDoc("v2", new OpenApiInfo
                               {
                                   Version = "v2",
                                   Title = "POS API",
                                   Description = "A simple example ASP.NET Core Web API",
                                   TermsOfService = new Uri("http://codemobiles.com"),
                                   Contact = new OpenApiContact
                                   {
                                       Name = "iBlur Blur",
                                       Email = "codemobiles@gmail.com",
                                       Url = new Uri("http://codemobiles.com"),
                                   },
                                   License = new OpenApiLicense
                                   {
                                       Name = "Use under MIT",
                                       Url = new Uri("http://codemobiles.com"),
                                   },
                               });
                               var securitySchema = new OpenApiSecurityScheme
                               {
                                   Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
                                   Name = "Authorization",
                                   In = ParameterLocation.Header,
                                   Type = SecuritySchemeType.Http,
                                   Scheme = "bearer",
                                   Reference = new OpenApiReference
                                   {
                                       Type = ReferenceType.SecurityScheme,
                                       Id = "Bearer"
                                   }
                               };
                               c.AddSecurityDefinition("Bearer", securitySchema);

                               var securityRequirement = new OpenApiSecurityRequirement();
                               securityRequirement.Add(securitySchema, new[] { "Bearer" });
                               c.AddSecurityRequirement(securityRequirement);

                               // Set the comments path for the Swagger JSON and UI.
                               var xmlFile = $"{Assembly.GetEntryAssembly().GetName().Name}.xml";
                               var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                               c.IncludeXmlComments(xmlPath);

                               // Uses full schema names to avoid v1/v2/v3 schema collisions
                               // see: https://github.com/domaindrivendev/Swashbuckle/issues/442
                               c.CustomSchemaIds(x => x.FullName);
                           });
        }

        public static void ConfigCORS(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigins", builder =>
                    {
                        builder.WithOrigins("http://example.com", "http://localhost:4200")
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                        //.WithMethods("GET", "POST", "HEAD");
                    });

                options.AddPolicy("AllowAll", builder =>
                {
                    builder.AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
                });

                /*
                    The browser can skip the preflight request
                    if the following conditions are true:
                    - The request method is GET, HEAD, or POST.
                    - The Content-Type header
                       - application/x-www-form-urlencoded
                       - multipart/form-data
                       - text/plain
                */
            });

        }

        public static void ConfigDatabase(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<DatabaseContext>(options => 
            options.UseSqlServer(configuration.GetConnectionString("ConnectionSQLServer")));
        }

        public static void ConfigJWT(this IServiceCollection services, IConfiguration Configuration)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = Configuration["Jwt:Issuer"],
                    ValidateAudience = true,
                    ValidAudience = Configuration["Jwt:Audience"],
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero, // disable delay when token is expire
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]))
                };
            });
        }

    }
}