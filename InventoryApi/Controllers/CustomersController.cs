using Microsoft.AspNetCore.Mvc;
using InventoryApi.DTOs;
using InventoryApi.Interfaces;

namespace InventoryApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomersController : ControllerBase
    {
        private readonly ICustomerService _customerService;

        public CustomersController(ICustomerService customerService) => _customerService = customerService;

        [HttpGet]
        public async Task<IActionResult> GetCustomers(int page = 1, int pageSize = 10)
        {
            var customers = await _customerService.GetCustomersAsync(page, pageSize);
            return Ok(customers);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCustomer(CreateCustomerDto dto)
        {
            try
            {
                var created = await _customerService.CreateCustomerAsync(dto);
                return CreatedAtAction(nameof(GetCustomers), new { id = created.Id }, created);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCustomer(int id, UpdateCustomerDto dto)
        {
            try
            {
                var updated = await _customerService.UpdateCustomerAsync(id, dto);
                return Ok(updated);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            try
            {
                await _customerService.DeleteCustomerAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }
    }
}
