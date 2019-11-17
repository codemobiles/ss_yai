using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using mypos_api.Models;
using mypos_api.Services;

namespace mypos_api.Controllers
{
    // [Authorize(Roles = "Admin")]
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        ILogger<ProductController> _logger;
        private readonly IProductRepository _productRepository;

        public ProductController(ILogger<ProductController> logger, IProductRepository productRepository)
        {
            this._productRepository = productRepository;
            _logger = logger;
        }

        [HttpGet]
        public IActionResult GetProducts()
        {
            try
            {
                var result = _productRepository.GetProducts();

                if (result == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(new { result = result, message = "request successfully"});
                }
            }
            catch (Exception error)
            {
                _logger.LogError($"Log GetProducts: {error}");
                return StatusCode(500, new { result = "", message = error });
            }
        }

        // ..../api/product/1
        [HttpGet("{id}")]
        public IActionResult GetProduct(int id)
        {
            try
            {
                var result = _productRepository.GetProduct(id);

                if (result == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(new { result = result, message = "request successfully" });
                }
            }
            catch (Exception error)
            {
                _logger.LogError($"Log GetProduct: {error}");
                return StatusCode(500, new { result = "", message = error });
            }
        }

        [HttpPost]
        //[DisableRequestSizeLimit]
        //[RequestSizeLimit(60_000_000)] // bytes
        public async Task<IActionResult> AddProduct([FromForm] Products product)
        {
            try
            {
                var result = await _productRepository.AddProduct(product);
                return Ok(new { result = result, message = "create product successfully" });
            }
            catch (Exception error)
            {
                _logger.LogError($"Log CreateProduct: {error}");
                return StatusCode(500, new { result = "", message = error });
            }
        }

        [HttpPut("{id}")]      // json formdata
        public async Task<IActionResult> EditProduct([FromForm] Products product, int id)
        {
            try
            {
                var result = await _productRepository.EditProduct(product, id);

                if (result == null)
                {
                    return NotFound();
                }

                return Ok(new { result = result, message = "update product successfully" });
            }
            catch (Exception error)
            {
                _logger.LogError($"Log UpdateProduct: {error}");
                return StatusCode(500, new { result = "", message = error });
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            try
            {
                var result = _productRepository.DeleteProduct(id);
                if (result == false)
                {
                    return NotFound();
                }
                return Ok(new { result = "", message = "delete product sucessfully" });
            }
            catch (Exception error)
            {
                _logger.LogError($"Log DeleteProduct: {error}");
                return StatusCode(500, new { result = "", message = error });
            }
        }




    }
}