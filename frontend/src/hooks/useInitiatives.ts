import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { initiativesApi } from '../services/api';
import { Initiative, InitiativeCreate } from '../types/initiative';

export const useInitiatives = () => {
  return useQuery({
    queryKey: ['initiatives'],
    queryFn: async () => {
      const response = await initiativesApi.getAll();
      return response.data;
    },
  });
};

export const useCreateInitiative = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: InitiativeCreate) => initiativesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['initiatives'] });
    },
  });
};

export const useUpdateInitiative = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Initiative> }) =>
      initiativesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['initiatives'] });
    },
  });
};

export const useDeleteInitiative = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => initiativesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['initiatives'] });
    },
  });
};

export const useReorderInitiatives = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (order: { id: string; order_index: number }[]) =>
      initiativesApi.reorder(order),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['initiatives'] });
    },
  });
};
