import axios from 'axios';
import { Initiative, InitiativeCreate } from '../types/initiative';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const initiativesApi = {
  getAll: () => apiClient.get<Initiative[]>('/api/initiatives/'),
  create: (data: InitiativeCreate) =>
    apiClient.post<Initiative>('/api/initiatives/', data),
  update: (id: string, data: Partial<Initiative>) =>
    apiClient.put<Initiative>(`/api/initiatives/${id}`, data),
  delete: (id: string) => apiClient.delete(`/api/initiatives/${id}`),
  reorder: (order: { id: string; order_index: number }[]) =>
    apiClient.patch('/api/initiatives/reorder', order),
};
