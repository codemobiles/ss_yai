using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace mypos_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]  // ..../api/auth
    public class AuthController : ControllerBase
    {
        ILogger<AuthController> _logger;

        public AuthController(ILogger<AuthController> logger)
        {
            _logger = logger;
        }

        // ..../api/auth/register
        [HttpPost("register")]
        public IActionResult Register()
        {
            try
            {
                return Ok("tanakorn ngam....");
            }
            catch (Exception)
            {
                _logger.LogError("Failed to execute GET");
                return BadRequest();
            }
        }

        [HttpPost("login")]
        public IActionResult Login()
        {
            try
            {
                return Ok("tanakorn ngam....");
            }
            catch (Exception)
            {
                _logger.LogError("Failed to execute GET");
                return BadRequest();
            }
        }

    }
}