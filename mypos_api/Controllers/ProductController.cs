using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace mypos_api.Controllers
{
    [ApiController]
    [Route("api")]
    public class ProductController : ControllerBase
    {

        ILogger<ProductController> _logger;

        public ProductController(ILogger<ProductController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok();
            }
            catch (Exception)
            {
                _logger.LogError("Failed to execute GET");
                return BadRequest();
            }
        }
    }
}