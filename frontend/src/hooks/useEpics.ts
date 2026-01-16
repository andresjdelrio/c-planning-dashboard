import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Epic } from '../types/initiative';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useEpics = (initiativeId: string) => {
  const queryClient = useQueryClient();

  const { data: epics = [], isLoading } = useQuery({
    queryKey: ['epics', initiativeId],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/api/initiatives/${initiativeId}/epics`);
      if (!response.ok) throw new Error('Failed to fetch epics');
      return response.json();
    },
    enabled: !!initiativeId,
  });

  const createEpic = useMutation({
    mutationFn: async (epic: Omit<Epic, 'id' | 'created_at' | 'updated_at'>) => {
      const response = await fetch(`${API_BASE_URL}/api/initiatives/${initiativeId}/epics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(epic),
      });
      if (!response.ok) throw new Error('Failed to create epic');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['epics', initiativeId] });
      queryClient.invalidateQueries({ queryKey: ['initiatives'] });
    },
  });

  const updateEpic = useMutation({
    mutationFn: async ({ epicId, data }: { epicId: string; data: Partial<Epic> }) => {
      const response = await fetch(`${API_BASE_URL}/api/initiatives/epics/${epicId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update epic');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['epics', initiativeId] });
      queryClient.invalidateQueries({ queryKey: ['initiatives'] });
    },
  });

  const deleteEpic = useMutation({
    mutationFn: async (epicId: string) => {
      const response = await fetch(`${API_BASE_URL}/api/initiatives/epics/${epicId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete epic');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['epics', initiativeId] });
      queryClient.invalidateQueries({ queryKey: ['initiatives'] });
    },
  });

  const reorderEpics = useMutation({
    mutationFn: async (order: { id: string; order_index: number }[]) => {
      const response = await fetch(`${API_BASE_URL}/api/initiatives/epics/reorder`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });
      if (!response.ok) throw new Error('Failed to reorder epics');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['epics', initiativeId] });
    },
  });

  return {
    epics,
    isLoading,
    createEpic: createEpic.mutate,
    updateEpic: updateEpic.mutate,
    deleteEpic: deleteEpic.mutate,
    reorderEpics: reorderEpics.mutate,
  };
};
