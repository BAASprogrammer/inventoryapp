using InventoryApi.DTOs;
using InventoryApi.Entities;
using InventoryApi.Interfaces;

namespace InventoryApi.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository) => _productRepository = productRepository;

        public async Task<PagedResult<ProductDto>> GetProductsAsync(int page, int pageSize)
        {
            var (items, totalCount) = await _productRepository.GetPagedAsync(page, pageSize);
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

            return new PagedResult<ProductDto>
            {
                Items = items.Select(p => new ProductDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Price = p.Price,
                    Stock = p.Stock,
                    Image = p.Image
                }),
                TotalItems = totalCount,
                TotalPages = totalPages,
                PageSize = pageSize,
                CurrentPage = page
            };
        }

        public async Task<ProductDto> CreateProductAsync(CreateProductDto dto)
        {
            if (string.IsNullOrEmpty(dto.Name) || string.IsNullOrEmpty(dto.Image) || dto.Price <= 0 || dto.Stock < 0)
                throw new ArgumentException("Se deben rellenar todos los campos del producto.");

            var product = new Product
            {
                Name = dto.Name,
                Price = dto.Price,
                Stock = dto.Stock,
                Image = dto.Image
            };

            await _productRepository.AddAsync(product);
            await _productRepository.SaveChangesAsync();

            return new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Price = product.Price,
                Stock = product.Stock,
                Image = product.Image
            };
        }

        public async Task<ProductDto> UpdateProductAsync(int id, UpdateProductDto dto)
        {
            var product = await _productRepository.GetByIdAsync(id);
            if (product == null) throw new KeyNotFoundException("Producto no encontrado");
            if (dto.Price <= 0 || dto.Stock < 0) throw new ArgumentException("El precio y el stock deben ser mayores a 0.");

            product.Name = dto.Name;
            product.Price = dto.Price;
            product.Stock = dto.Stock;
            if (dto.Image != null) product.Image = dto.Image;

            await _productRepository.UpdateAsync(product);
            await _productRepository.SaveChangesAsync();

            return new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Price = product.Price,
                Stock = product.Stock,
                Image = product.Image
            };
        }

        public async Task DeleteProductAsync(int id)
        {
            var product = await _productRepository.GetByIdAsync(id);
            if (product == null) throw new KeyNotFoundException("Producto no encontrado");
            await _productRepository.DeleteAsync(product);
            await _productRepository.SaveChangesAsync();
        }
    }
}
