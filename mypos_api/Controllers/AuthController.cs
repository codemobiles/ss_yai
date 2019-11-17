using System;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using mypos_api.Database;
using mypos_api.Extensions;
using mypos_api.Models;
using mypos_api.Services;
using mypos_api.ViewModels;

namespace mypos_api.Controllers
{

    [ApiController]
    [AllowAnonymous]
    [Route("api/[controller]")]  // ..../api/auth
    public class AuthController : ControllerBase
    {
        ILogger<AuthController> _logger;
        private readonly IAuthRepository _authRepository;

        public AuthController(ILogger<AuthController> logger, IAuthRepository authRepository)
        {
            this._authRepository = authRepository;
            _logger = logger;
        }

        // ..../api/auth/register
        [HttpPost("register")]
        public IActionResult Register(Users user)
        {
            try
            {
                _authRepository.Register(user);
                return Ok(new { result = "ok", message = "register successfully" });
            }
            catch (Exception error)
            {
               _logger.LogError($"Log GetProducts: {error}");
                return StatusCode(500, new { result = "", message = error });
            }
        }

        [HttpPost("login")]
        public IActionResult Login(UserViewModel userViewModel)
        {
            try
            {

                Users user = new Users();
                user.Username = userViewModel.Username;
                user.Password = userViewModel.Password;

                (Users data, bool passwordValid, string token) = _authRepository.Login(user);

                if (data == null || !passwordValid)
                {
                    return Unauthorized(new { token = "", message = "username or password incorrect" });
                }
                return Ok(new { token = token, message = "login successfully" });
            }
            catch (Exception error)
            {
                 _logger.LogError($"Log GetProducts: {error}");
                return StatusCode(500, new { result = "", message = error });
            }
        }

    }
}