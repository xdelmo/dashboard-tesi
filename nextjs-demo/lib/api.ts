import { Customer, CustomerStats, Order, User } from '@/types';

const API_URL = 'http://localhost:3001';

export const api = {
  customers: {
    getAll: async (): Promise<Customer[]> => {
      const res = await fetch(`${API_URL}/customers`, { cache: 'no-store' });
      if (!res.ok) return [];
      return res.json();
    },
    getById: async (id: string): Promise<Customer | undefined> => {
      const res = await fetch(`${API_URL}/customers/${id}`, {
        cache: 'no-store',
      });
      if (!res.ok) return undefined;
      return res.json();
    },
    create: async (customer: Customer): Promise<Customer> => {
      const res = await fetch(`${API_URL}/customers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer),
      });
      return res.json();
    },
    update: async (
      id: string,
      updates: Partial<Customer>
    ): Promise<Customer> => {
      const res = await fetch(`${API_URL}/customers/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      return res.json();
    },
    delete: async (id: string): Promise<void> => {
      await fetch(`${API_URL}/customers/${id}`, {
        method: 'DELETE',
      });
    },
  },
  stats: {
    getAll: async (): Promise<CustomerStats[]> => {
      const res = await fetch(`${API_URL}/customerStats`, {
        cache: 'no-store',
      });
      if (!res.ok) return [];
      return res.json();
    },
  },
  users: {
    findByEmail: async (email: string): Promise<User | undefined> => {
      const res = await fetch(`${API_URL}/users?email=${email}`, {
        cache: 'no-store',
      });
      if (!res.ok) return undefined;
      const users = await res.json();
      return users.length > 0 ? users[0] : undefined;
    },
  },
  orders: {
    getAll: async (): Promise<Order[]> => {
      const res = await fetch(`${API_URL}/orders`, { cache: 'no-store' });
      if (!res.ok) return [];
      return res.json();
    },
  },
};
