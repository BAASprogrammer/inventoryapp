using InventoryApi.Entities;
using InventoryApi.Data;
using InventoryApi.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace InventoryApi.Repositories
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly AppDbContext _context;
        public CustomerRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Customer>> GetAllAsync()
        {
            return await _context.Customers.ToListAsync();
        }
        public async Task<Customer?> GetByIdAsync(int id)
        {
            return await _context.Customers.FindAsync(id);
        }
        public async Task AddAsync(Customer customer)
        {
            await _context.Customers.AddAsync(customer);
        }
        public Task UpdateAsync(Customer customer)
        {
            _context.Customers.Update(customer);
            return Task.CompletedTask;
        }
        public Task DeleteAsync(Customer customer)
        {
            _context.Customers.Remove(customer);
            return Task.CompletedTask;
        }
        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
        public async Task<Customer?> GetByEmailAsync(string email)
        {
            return await _context.Customers.FirstOrDefaultAsync(c => c.Email == email);
        }
        public async Task<Customer?> GetByPhoneAsync(string phone)
        {
            return await _context.Customers.FirstOrDefaultAsync(c => c.Phone == phone);
        }
    }
}
