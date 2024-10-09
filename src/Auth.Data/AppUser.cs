using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace Auth.Data;

public class AppUser : IdentityUser
{
    [MaxLength(1024)] public string? ImageUrl { get; set; }
}