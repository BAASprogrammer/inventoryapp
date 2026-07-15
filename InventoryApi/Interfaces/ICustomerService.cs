using InventoryApi.DTOs;

namespace InventoryApi.Interfaces
{
    public interface ICustomerService
    {
        //GetAll customers with pagination
        Task<IEnumerable<CustomerDto>> GetCustomersAsync(int page = 1, int pageSize = 10);
        //Create customer
        Task<CustomerDto> CreateCustomerAsync(CreateCustomerDto dto);
        //Update customer
        Task<CustomerDto> UpdateCustomerAsync(int id, UpdateCustomerDto dto);
        //Delete customer
        Task DeleteCustomerAsync(int id);
    }
}
