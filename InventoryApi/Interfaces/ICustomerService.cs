using InventoryApi.DTOs;

namespace InventoryApi.Interfaces
{
    public interface ICustomerService
    {
        Task<IEnumerable<CustomerDto>> GetCustomersAsync(int page = 1, int pageSize = 10);
        Task<CustomerDto> CreateCustomerAsync(CreateCustomerDto dto);
        Task<CustomerDto> UpdateCustomerAsync(int id, UpdateCustomerDto dto);
        Task DeleteCustomerAsync(int id);
    }
}
