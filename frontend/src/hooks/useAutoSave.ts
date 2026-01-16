import { useMemo } from 'react';
import { debounce } from 'lodash';
import { useUpdateInitiative } from './useInitiatives';
import { Initiative } from '../types/initiative';

export const useAutoSave = () => {
  const updateMutation = useUpdateInitiative();

  const debouncedSave = useMemo(
    () =>
      debounce((id: string, data: Partial<Initiative>) => {
        updateMutation.mutate({ id, data });
      }, 2000),
    [updateMutation]
  );

  return { save: debouncedSave, isSaving: updateMutation.isPending };
};
