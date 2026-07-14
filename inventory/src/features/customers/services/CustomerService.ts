import type { Customer } from "../types/Customer";
import { API_BASE_URL } from "../../../shared/services/apiConfig";

async function handleResponse<T>(response: Response): Promise<T> {
  const text = await response.text();
  if (!response.ok) throw new Error(text || "Error en la solicitud");
  return text ? JSON.parse(text) : undefined as T;
}

export const CustomerService = {
  async getAll(): Promise<Customer[]> {
    const response = await fetch(`${API_BASE_URL}/customers`);
    return handleResponse<Customer[]>(response);
  },
  async create(customer: Omit<Customer, "id">): Promise<Customer> {
    const response = await fetch(`${API_BASE_URL}/customers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    });
    return handleResponse<Customer>(response);
  },
  async update(customer: Customer): Promise<Customer> {
    const response = await fetch(`${API_BASE_URL}/customers/${customer.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    });
    return handleResponse<Customer>(response);
  },
  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
      method: "DELETE",
    });
    await handleResponse<void>(response);
  }
};
