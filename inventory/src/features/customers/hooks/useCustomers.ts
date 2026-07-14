import { useState, useEffect } from "react";
import type { Customer } from "../types/Customer";
import { CustomerService } from "../services/CustomerService";
import { validateEmail, validatePhone } from "../../../utils/validations";

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<{
    title: string, message: string, id?: number | null, type?: 'confirm' | 'error' | 'success' | 'info'
  } | null>(null);

  const loadCustomers = async () => {
    setLoading(true);
    try {
      const data = await CustomerService.getAll();
      setCustomers(data);
    } catch (err: any) {
      setModal({ title: "Error", message: err.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const createCustomer = async () => {
    if (!validateCustomer()) return;
    try {
      await CustomerService.create({ name, email, phone });
      setName("");
      setEmail("");
      setPhone("");
      await loadCustomers();
      setModal({ title: "Cliente Creado", message: "El cliente se ha creado correctamente", type: "success" });
    } catch (err: any) {
      setModal({ title: "Crear Cliente", message: err.message, type: "error" });
    }
  };

  const updateCustomer = async (customer: Customer) => {
    try {
      await CustomerService.update(customer);
      setEditingId(null);
      await loadCustomers();
      setModal({ title: "Cliente Actualizado", message: "El cliente se ha actualizado correctamente", type: "success" });
    } catch (err: any) {
      setModal({ title: "Actualizar Cliente", message: err.message, type: "error" });
    }
  };

  const deleteCustomer = (customer: Customer) => {
    setModal({ title: "Eliminar Cliente", message: "¿Está seguro de que desea eliminar el cliente " + customer.name + "?", id: customer.id, type: "confirm" });
  };

  const confirmDelete = async (id: number | null) => {
    try {
      setModal(null);
      if (id === null) return;
      await CustomerService.delete(id);
      await loadCustomers();
      setModal({ title: "Cliente Eliminado", message: "El cliente ha sido eliminado correctamente", type: "success" });
    } catch (err: any) {
      setModal({ title: "Error", message: err.message, type: "error" });
    }
  };

  const validateCustomer = (): boolean => {
    if (name.trim() === "") {
      setModal({ title: "Crear Cliente", message: "El nombre del cliente es obligatorio.", type: "error" });
      return false;
    }
    if (email.trim() === "") {
      setModal({ title: "Crear Cliente", message: "El email del cliente es obligatorio.", type: "error" });
      return false;
    }
    if (!validateEmail(email)) {
      setModal({ title: "Crear Cliente", message: "El email del cliente no es válido.", type: "error" });
      return false;
    }
    if (phone.trim() === "") {
      setModal({ title: "Crear Cliente", message: "El teléfono del cliente es obligatorio.", type: "error" });
      return false;
    }
    if (!validatePhone(phone)) {
      setModal({ title: "Crear Cliente", message: "El teléfono del cliente no es válido.", type: "error" });
      return false;
    }
    return true;
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  return {
    customers, setCustomers,
    name, setName,
    email, setEmail,
    phone, setPhone,
    editingId, setEditingId,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    confirmDelete,
    loading,
    modal, setModal,
  };
}
