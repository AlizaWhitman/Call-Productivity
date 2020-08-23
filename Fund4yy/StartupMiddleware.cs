using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BL;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using MyLocalSite;

namespace Fund4yy
{
    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public class StartupMiddleware
    {
        private readonly RequestDelegate _next;
        private ILogger<ErrorHandlingMiddleware> _logger;
        private ICallSessionBL _callSessionBL;

        public StartupMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public  Task Invoke(HttpContext httpContext, ILogger<ErrorHandlingMiddleware> logger, ICallSessionBL callSessionBL)
        {
            //_callSessionBL = callSessionBL;
            _logger = logger;
            return _next(httpContext);
        }
    }

    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class StartupMiddlewareExtensions
    {
        public static IApplicationBuilder UseStartupMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<StartupMiddleware>();
        }
    }
}
