using InventoryApi.DTOs;
using InventoryApi.Entities;
using InventoryApi.Interfaces; 
using System.Text.RegularExpressions;

namespace InventoryApi.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly ICustomerRepository _customerRepository;

        public CustomerService(ICustomerRepository customerRepository) => _customerRepository = customerRepository;

        public async Task<IEnumerable<CustomerDto>> GetCustomersAsync(int page = 1, int pageSize = 10)
        {
            var customers = await _customerRepository.GetAllAsync();
            var paged = customers
                .Skip((page - 1) * pageSize)
                .Take(pageSize);
            return paged.Select(c => new CustomerDto
            {
                Id = c.Id,
                Name = c.Name,
                Email = c.Email,
                Phone = c.Phone
            });
        }

        public async Task<CustomerDto> CreateCustomerAsync(CreateCustomerDto dto)
        {
            if (string.IsNullOrEmpty(dto.Name)) throw new ArgumentException("Nombre es requerido");
            if (string.IsNullOrEmpty(dto.Email)) throw new ArgumentException("Email es requerido");
            if (string.IsNullOrEmpty(dto.Phone)) throw new ArgumentException("Teléfono es requerido");
            var emailRegex = new Regex("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]+$");
            if (!emailRegex.IsMatch(dto.Email)) throw new ArgumentException("Email inválido");
            var phoneRegex = new Regex("^\\+569\\d{8}$");
            if (!phoneRegex.IsMatch(dto.Phone)) throw new ArgumentException("Teléfono inválido");
            var existEmail = await _customerRepository.GetByEmailAsync(dto.Email);
            if (existEmail != null) throw new ArgumentException("El email ya existe");
            var existPhone = await _customerRepository.GetByPhoneAsync(dto.Phone);
            if (existPhone != null) throw new ArgumentException("El teléfono ya existe");

            var customer = new Customer
            {
                Name = dto.Name,
                Email = dto.Email,
                Phone = dto.Phone
            };

            await _customerRepository.AddAsync(customer);
            await _customerRepository.SaveChangesAsync();

            return new CustomerDto
            {
                Id = customer.Id,
                Name = customer.Name,
                Email = customer.Email,
                Phone = customer.Phone
            };
        }

        public async Task<CustomerDto> UpdateCustomerAsync(int id, UpdateCustomerDto dto)
        {
            if (string.IsNullOrEmpty(dto.Name)) throw new ArgumentException("Nombre es requerido");
            if (string.IsNullOrEmpty(dto.Email)) throw new ArgumentException("Email es requerido");
            if (string.IsNullOrEmpty(dto.Phone)) throw new ArgumentException("Teléfono es requerido");

            var customer = await _customerRepository.GetByIdAsync(id);
            if (customer == null) throw new KeyNotFoundException("Cliente no encontrado");

            customer.Name = dto.Name;
            customer.Email = dto.Email;
            customer.Phone = dto.Phone;

            await _customerRepository.UpdateAsync(customer);
            await _customerRepository.SaveChangesAsync();

            return new CustomerDto
            {
                Id = customer.Id,
                Name = customer.Name,
                Email = customer.Email,
                Phone = customer.Phone
            };
        }

        public async Task DeleteCustomerAsync(int id)
        {
            var customer = await _customerRepository.GetByIdAsync(id);
            if (customer == null) throw new KeyNotFoundException("Cliente no encontrado");

            await _customerRepository.DeleteAsync(customer);
            await _customerRepository.SaveChangesAsync();
        }
    }
}
