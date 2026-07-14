using InventoryApi.DTOs;

namespace InventoryApi.Interfaces
{
    public interface IProductService
    {
        Task<PagedResult<ProductDto>> GetProductsAsync(int page, int pageSize);
        Task<ProductDto> CreateProductAsync(CreateProductDto dto);
        Task<ProductDto> UpdateProductAsync(int id, UpdateProductDto dto);
        Task DeleteProductAsync(int id);
    }
}
