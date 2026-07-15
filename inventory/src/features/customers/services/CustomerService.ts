import type { Customer } from "../types/Customer";
import { API_BASE_URL } from "../../../shared/services/apiConfig";

// Handle server response
async function handleResponse<T>(response: Response): Promise<T> {
  const text = await response.text();
  if (!response.ok) throw new Error(text || "Error en la solicitud");
  return text ? JSON.parse(text) : undefined as T;
}
// getAll customers
export const CustomerService = {
  async getAll(): Promise<Customer[]> {
    const response = await fetch(`${API_BASE_URL}/customers`);
    return handleResponse<Customer[]>(response);
  },
  // Create customer
  async create(customer: Omit<Customer, "id">): Promise<Customer> {
    const response = await fetch(`${API_BASE_URL}/customers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    });
    return handleResponse<Customer>(response);
  },
  // Update customer
  async update(customer: Customer): Promise<Customer> {
    const response = await fetch(`${API_BASE_URL}/customers/${customer.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    });
    return handleResponse<Customer>(response);
  },
  // Delete customer
  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
      method: "DELETE",
    });
    await handleResponse<void>(response);
  }
};
