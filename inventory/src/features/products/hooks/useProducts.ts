import { useState, useEffect } from "react";
import type { Product } from "../types/Product";
import { ProductService } from "../services/ProductService";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [modal, setModal] = useState<{ title: string, message: string } | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const editProduct = (id: number) => {
    const product = products.find(p => p.id === id);
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setStock(product.stock);
      setImageFile(null);
    }
    setEditingId(id);
  };

  const saveProduct = async (id: number) => {
    if (!validateProduct()) return;
    try {
      await ProductService.update(id, { name, price, stock, image: "" }, imageFile);
      setEditingId(null);
      setName("");
      setPrice(0);
      setStock(0);
      setImageFile(null);
      setModal({ title: "Producto Actualizado", message: "El producto se ha actualizado correctamente" });
      await loadProducts();
    } catch (err: any) {
      setModal({ title: "Error", message: err.message });
    }
  }

  const deleteProduct = async (id: number) => {
    try {
      setDeletingId(id);
      await ProductService.delete(id);
      setModal({ title: "Producto Eliminado", message: "El producto se ha eliminado correctamente" });
      await loadProducts();
    } catch (err: any) {
      setModal({ title: "Error", message: err.message });
    } finally {
      setDeletingId(null);
    }
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await ProductService.getAll(currentPage, 6);
      setProducts(data.products);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (err: any) {
      setModal({ title: "Error", message: err.message });
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async () => {
    if (!validateProduct()) return;
    try {
      await ProductService.create({ name, price, stock, image: "" }, imageFile);
      setName("");
      setPrice(0);
      setStock(0);
      setImageFile(null);
      await loadProducts();
      setModal({ title: "Producto Creado", message: "El producto se ha creado correctamente" });
    } catch (err: any) {
      setModal({ title: "Crear Producto", message: "Error al crear el producto. Verifica los datos." });
    }
  };

  const validateProduct = () => {
    if (!name.trim()) {
      setModal({ title: "Crear Producto", message: "El nombre del producto es obligatorio." });
      return false;
    }
    if (!imageFile) {
      setModal({ title: "Crear Producto", message: "La imagen del producto es obligatoria." });
      return false;
    }
    if (price <= 0) {
      setModal({ title: "Crear Producto", message: "El precio debe ser mayor a 0." });
      return false;
    }
    if (stock <= 0) {
      setModal({ title: "Crear Producto", message: "El stock debe ser mayor a 0." });
      return false;
    }
    return true;
  }

  useEffect(() => {
    loadProducts();
  }, [currentPage]);

  return {
    products,
    name, setName,
    price, setPrice,
    stock, setStock,
    imageFile, setImageFile,
    createProduct,
    loading,
    totalPages,
    currentPage,
    setCurrentPage,
    editProduct,
    deleteProduct,
    editingId,
    setEditingId,
    saveProduct,
    deletingId,
    setDeletingId,
    setModal,
    modal
  };
}
