namespace Auth.Api.Models;

public class UserDto
{
    public required string UserId { get; set; } 
    public string? UserName { get; set; } 
    public string? Email { get; set; } 
}