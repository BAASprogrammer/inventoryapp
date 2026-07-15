using InventoryApi.Entities;

namespace InventoryApi.Interfaces
{
    public interface IProductRepository
    {
        //GetAll products with pagination
        Task<(IEnumerable<Product> Items, int TotalCount)> GetPagedAsync(int page, int pageSize);
        //GetProductById
        Task<Product?> GetByIdAsync(int id);
        //AddProduct
        Task AddAsync(Product product);
        //UpdateProduct
        Task UpdateAsync(Product product);
        //DeleteProduct
        Task DeleteAsync(Product product);
        //SaveChangesAsync
    }
}
