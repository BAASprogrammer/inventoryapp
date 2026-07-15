using InventoryApi.DTOs;

namespace InventoryApi.Interfaces
{
    public interface IProductService
    {
        //GetAll products with pagination
        Task<PagedResult<ProductDto>> GetProductsAsync(int page, int pageSize);
        //Create product
        Task<ProductDto> CreateProductAsync(CreateProductDto dto);
        //Update product
        Task<ProductDto> UpdateProductAsync(int id, UpdateProductDto dto);
        //Delete product
        Task DeleteProductAsync(int id);
    }
}
