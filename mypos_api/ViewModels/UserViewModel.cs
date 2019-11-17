using System.ComponentModel.DataAnnotations;

namespace mypos_api.ViewModels
{
    public class UserViewModel
    {
        // Data annotaion form validate
        [Required]
        // [EmailAddress]
        public string Username { get; set; }

        [MinLength(8, ErrorMessage = "พาสขั้นต่ำ 8")]
        public string Password { get; set; }
    }
}
