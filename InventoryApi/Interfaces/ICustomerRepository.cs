using InventoryApi.Entities;

namespace InventoryApi.Interfaces
{
    public interface ICustomerRepository
    {
        Task<IEnumerable<Customer>> GetAllAsync();
        Task<Customer?> GetByIdAsync(int id);
        Task AddAsync(Customer customer);
        Task UpdateAsync(Customer customer);
        Task DeleteAsync(Customer customer);
        Task SaveChangesAsync();
        Task<Customer?> GetByEmailAsync(string email);
        Task<Customer?> GetByPhoneAsync(string phone);
    }
}
