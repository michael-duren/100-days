namespace Auth.Api.Services;

interface IJwtCookieService
{
    void SetJwtCookie(HttpContext httpContext, string jwt);
    void RemoveJwtCookie(HttpContext httpContext);
}

public class JwtCookieService : IJwtCookieService
{
    public void SetJwtCookie(HttpContext httpContext, string jwt)
    {
        var isDevelopment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development";

        CookieOptions cookieOptions;
        if (isDevelopment)
        {
            cookieOptions = new()
            {
                HttpOnly = true, // Prevent JavaScript access (helps protect against XSS)
                Secure = false, // Only send the cookie over HTTPS
                SameSite = SameSiteMode.None, // Only send the cookie in first-party contexts
                Expires = DateTime.UtcNow.AddDays(1)
            };
        }
        else
        {
            cookieOptions = new()
            {
                HttpOnly = true, // Prevent JavaScript access (helps protect against XSS)
                Secure = true, // Only send the cookie over HTTPS
                SameSite = SameSiteMode.Strict, // Only send the cookie in first-party contexts
                Expires = DateTime.UtcNow.AddDays(1)
            };
        }

        httpContext.Response.Cookies.Append("jwt", jwt, cookieOptions);
    }

    public void RemoveJwtCookie(HttpContext httpContext)
    {
        httpContext.Response.Cookies.Delete("jwt");
    }
}