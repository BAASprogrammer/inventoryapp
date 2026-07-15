using InventoryApi.Entities;

namespace InventoryApi.Interfaces
{
    public interface ICustomerRepository
    {
        //GetAll customers
        Task<IEnumerable<Customer>> GetAllAsync();
        //GetCustomerById
        Task<Customer?> GetByIdAsync(int id);
        //AddCustomer
        Task AddAsync(Customer customer);
        //UpdateCustomer
        Task UpdateAsync(Customer customer);
        //DeleteCustomer
        Task DeleteAsync(Customer customer);
        //SaveChangesAsync
        Task SaveChangesAsync();
        //GetCustomerByEmail
        Task<Customer?> GetByEmailAsync(string email);
        //GetCustomerByPhone
        Task<Customer?> GetByPhoneAsync(string phone);
    }
}
