import { Box, Typography, TextField, Button, CircularProgress, Portal } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import { Initiative } from '../../types/initiative';
import { useEpics } from '../../hooks/useEpics';

interface EpicDetailRendererProps {
  data: Initiative;
}

export const EpicDetailRenderer = ({ data }: EpicDetailRendererProps) => {
  const { epics, isLoading, createEpic, updateEpic, deleteEpic, reorderEpics } = useEpics(data.id);
  const [newEpicName, setNewEpicName] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Edit state
  const [editingEpicId, setEditingEpicId] = useState<string | null>(null);
  const [editingEpicName, setEditingEpicName] = useState('');
  const editInputRef = useRef<HTMLInputElement>(null);

  // Drag state
  const [draggedEpicId, setDraggedEpicId] = useState<string | null>(null);

  useEffect(() => {
    if (showAddForm && inputRef.current) {
      // Focus with a small delay to ensure the input is rendered
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [showAddForm]);

  const handleAddEpic = () => {
    if (!newEpicName.trim()) return;

    createEpic({
      initiative_id: data.id,
      name: newEpicName,
      description: '',
      effort_level: '',
      resource: '',
      status: 'Pending',
      order_index: epics.length,
    });

    setNewEpicName('');
    setShowAddForm(false);
  };

  const handleDeleteEpic = (epicId: string) => {
    deleteEpic(epicId);
  };

  // Edit handlers
  const handleStartEdit = (epic: any) => {
    setEditingEpicId(epic.id);
    setEditingEpicName(epic.name);
    setTimeout(() => editInputRef.current?.focus(), 50);
  };

  const handleSaveEdit = () => {
    if (!editingEpicId || !editingEpicName.trim()) {
      setEditingEpicId(null);
      return;
    }

    updateEpic({
      epicId: editingEpicId,
      data: { name: editingEpicName },
    });

    setEditingEpicId(null);
    setEditingEpicName('');
  };

  const handleCancelEdit = () => {
    setEditingEpicId(null);
    setEditingEpicName('');
  };

  // Drag handlers
  const handleDragStart = (e: React.DragEvent, epicId: string) => {
    setDraggedEpicId(epicId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetEpicId: string) => {
    e.preventDefault();

    if (!draggedEpicId || draggedEpicId === targetEpicId) {
      setDraggedEpicId(null);
      return;
    }

    // Find indices
    const draggedIndex = epics.findIndex((ep: any) => ep.id === draggedEpicId);
    const targetIndex = epics.findIndex((ep: any) => ep.id === targetEpicId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    // Reorder array
    const newEpics = [...epics];
    const [removed] = newEpics.splice(draggedIndex, 1);
    newEpics.splice(targetIndex, 0, removed);

    // Update order_index values
    const updatedOrder = newEpics.map((epic: any, index: number) => ({
      id: epic.id,
      order_index: index,
    }));

    // Persist to backend
    reorderEpics(updatedOrder);
    setDraggedEpicId(null);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2, bgcolor: '#F9FAFB', borderTop: '1px solid #E5E7EB' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#374151' }}>
          Épicas
        </Typography>
        <Button
          size="small"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowAddForm(!showAddForm);
          }}
          variant="outlined"
          sx={{
            ml: 'auto',
            minWidth: 'auto',
            p: 0.5,
            fontSize: '18px',
            fontWeight: 'bold'
          }}
        >
          +
        </Button>
      </Box>

      {showAddForm && (
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Nombre de la épica"
            value={newEpicName}
            onChange={(e) => setNewEpicName(e.target.value)}
            onKeyDown={(e) => {
              e.stopPropagation();
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddEpic();
              }
            }}
            onKeyUp={(e) => e.stopPropagation()}
            onKeyPress={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            autoComplete="off"
            style={{
              flex: 1,
              padding: '8px 12px',
              border: '1px solid #D1D5DB',
              borderRadius: '4px',
              fontSize: '14px',
              outline: 'none',
              backgroundColor: 'white',
            }}
            onFocus={(e) => {
              e.stopPropagation();
              e.target.style.borderColor = '#3B82F6';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#D1D5DB';
            }}
          />
          <Button
            size="small"
            variant="contained"
            onClick={handleAddEpic}
            disabled={!newEpicName.trim()}
          >
            Agregar
          </Button>
          <Button
            size="small"
            variant="outlined"
            onClick={() => {
              setShowAddForm(false);
              setNewEpicName('');
            }}
          >
            Cancelar
          </Button>
        </Box>
      )}

      {epics.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
          No hay épicas. Haz clic en + para agregar una.
        </Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {epics.map((epic, index) => (
            <Box
              key={epic.id}
              draggable={editingEpicId === null}
              onDragStart={(e) => handleDragStart(e, epic.id)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, epic.id)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1.5,
                bgcolor: 'white',
                borderRadius: 1,
                border: '1px solid #E5E7EB',
                gap: 2,
                cursor: editingEpicId === null ? 'grab' : 'default',
                opacity: draggedEpicId === epic.id ? 0.5 : 1,
                '&:active': {
                  cursor: editingEpicId === null ? 'grabbing' : 'default',
                },
              }}
            >
              <Typography variant="body2" sx={{ color: '#9CA3AF', cursor: 'grab', userSelect: 'none' }}>
                ☰
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500, minWidth: 30 }}>
                {index + 1}.
              </Typography>

              {editingEpicId === epic.id ? (
                <input
                  ref={editInputRef}
                  type="text"
                  value={editingEpicName}
                  onChange={(e) => setEditingEpicName(e.target.value)}
                  onBlur={handleSaveEdit}
                  onKeyDown={(e) => {
                    e.stopPropagation();
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSaveEdit();
                    }
                    if (e.key === 'Escape') {
                      handleCancelEdit();
                    }
                  }}
                  onKeyUp={(e) => e.stopPropagation()}
                  onClick={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.stopPropagation()}
                  style={{
                    flex: 1,
                    padding: '4px 8px',
                    border: '1px solid #3B82F6',
                    borderRadius: '4px',
                    fontSize: '14px',
                    outline: 'none',
                    backgroundColor: 'white',
                  }}
                />
              ) : (
                <Typography
                  variant="body2"
                  sx={{
                    flex: 1,
                    cursor: 'pointer',
                    '&:hover': { bgcolor: '#F3F4F6' },
                    p: 0.5,
                    borderRadius: 0.5,
                  }}
                  onClick={() => handleStartEdit(epic)}
                >
                  {epic.name}
                </Typography>
              )}

              {epic.effort_level && (
                <Typography variant="caption" sx={{ color: '#6B7280', minWidth: 80 }}>
                  {epic.effort_level}
                </Typography>
              )}
              {epic.resource && (
                <Typography variant="caption" sx={{ color: '#6B7280', minWidth: 60 }}>
                  {epic.resource}
                </Typography>
              )}
              <Button
                size="small"
                onClick={() => handleDeleteEpic(epic.id)}
                sx={{ color: '#EF4444', minWidth: 'auto', p: 0.5 }}
              >
                ×
              </Button>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
