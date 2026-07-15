using Microsoft.AspNetCore.Mvc;
using InventoryApi.DTOs;
using InventoryApi.Interfaces;

namespace InventoryApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService) => _productService = productService;

        //GET api/products
        //Returns all products with pagination
        [HttpGet]
        public async Task<IActionResult> GetProducts(int page = 1, int pageSize = 6)
        {
            var result = await _productService.GetProductsAsync(page, pageSize);
            return Ok(result);
        }

        //POST api/products
        //Creates a new product
        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromForm] CreateProductDto dto, [FromForm] IFormFile? imageFile)
        {
            try
            {
                dto.Image = await SaveImageAsync(imageFile);
                var createdProduct = await _productService.CreateProductAsync(dto);
                return CreatedAtAction(nameof(GetProducts), new { id = createdProduct.Id }, createdProduct);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //PUT api/products/{id}
        //Updates an existing product
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromForm] UpdateProductDto dto, [FromForm] IFormFile? imageFile)
        {
            try
            {
                dto.Image = await SaveImageAsync(imageFile);
                var updatedProduct = await _productService.UpdateProductAsync(id, dto);
                return Ok(updatedProduct);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //DELETE api/products/{id}
        //Deletes a product
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            try
            {
                await _productService.DeleteProductAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        //Helper method to save image
        private async Task<string?> SaveImageAsync(IFormFile? imageFile)
        {
            if (imageFile == null || imageFile.Length == 0) return null;

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(imageFile.FileName)}";
            var filePath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(stream);
            }

            return $"/uploads/{fileName}";
        }
    }
}
