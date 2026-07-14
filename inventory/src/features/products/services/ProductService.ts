import type { Product } from "../types/Product";
import { API_BASE_URL } from "../../../shared/services/apiConfig";

export const ProductService = {
  async getAll(currentPage: number, pageSize: number): Promise<{ products: Product[], totalItems: number, totalPages: number, pageSize: number, currentPage: number }> {
    const response = await fetch(`${API_BASE_URL}/products?page=${currentPage}&pageSize=${pageSize}`);
    if (!response.ok) throw new Error("Error obteniendo los productos");
    const data = await response.json();
    return { products: data.items, totalItems: data.totalItems, totalPages: data.totalPages, pageSize: data.pageSize, currentPage: data.currentPage };
  },
  async create(product: Omit<Product, "id">, imageFile?: File | null): Promise<Product> {
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price.toString());
    formData.append("stock", product.stock.toString());
    
    if (imageFile) {
      formData.append("imageFile", imageFile);
    }

    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      body: formData,
    });
    const data = await response.text();
    if (!response.ok) throw new Error(data || "Error creando el producto");
    return JSON.parse(data);
  },
  async update(id: number, product: Omit<Product, "id">, imageFile?: File | null): Promise<Product> {
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price.toString());
    formData.append("stock", product.stock.toString());
    
    if (imageFile) {
      formData.append("imageFile", imageFile);
    } else if (product.image) {
      // Keep existing image URL if not replacing
      formData.append("image", product.image);
    }

    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "PUT",
      body: formData,
    });
    const data = await response.text();
    if (!response.ok) throw new Error(data || "Error actualizando el producto");
    return JSON.parse(data);
  },
  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Error eliminando el producto");
  }
};
