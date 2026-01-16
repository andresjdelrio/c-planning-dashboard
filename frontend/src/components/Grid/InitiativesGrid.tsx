import { useMemo, useCallback, useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { Box, Typography, Dialog, DialogTitle, DialogContent, Button } from '@mui/material';
import { columnDefs } from './ColumnDefs';
import { Initiative } from '../../types/initiative';
import { useReorderInitiatives, useDeleteInitiative, useUpdateInitiative } from '../../hooks/useInitiatives';
import { CellValueChangedEvent, RowDragEndEvent } from 'ag-grid-community';
import { falabellaColors } from '../../utils/colors';
import { EpicDetailRenderer } from './EpicDetailRenderer';
import { ExpandButton } from './ExpandButton';
import { InitiativesCellRenderer } from './InitiativesCellRenderer';
import { DeleteButtonRenderer } from './DeleteButtonRenderer';
import { OP2CellRenderer } from './OP2CellRenderer';
import { PriorityCellRenderer } from './PriorityCellRenderer';
import { exportInitiativesToExcel } from '../../utils/excelExport';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import './GridStyles.css';

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

interface InitiativesGridProps {
  initiatives: Initiative[];
}

export const InitiativesGrid = ({ initiatives }: InitiativesGridProps) => {
  const { mutate: updateInitiative } = useUpdateInitiative();
  const { mutate: reorder } = useReorderInitiatives();
  const { mutate: deleteInitiative } = useDeleteInitiative();
  const [epicsDialogOpen, setEpicsDialogOpen] = useState(false);
  const [selectedInitiative, setSelectedInitiative] = useState<Initiative | null>(null);
  const [unsavedChanges, setUnsavedChanges] = useState<Map<string, Partial<Initiative>>>(new Map());

  // Listen for custom events from the grid
  useEffect(() => {
    const handleOpenEpics = (event: any) => {
      setSelectedInitiative(event.detail);
      setEpicsDialogOpen(true);
    };

    const handleDeleteInitiative = (event: any) => {
      const initiative = event.detail;
      if (initiative && initiative.id) {
        deleteInitiative(initiative.id);
      }
    };

    window.addEventListener('openEpics', handleOpenEpics);
    window.addEventListener('deleteInitiative', handleDeleteInitiative);

    return () => {
      window.removeEventListener('openEpics', handleOpenEpics);
      window.removeEventListener('deleteInitiative', handleDeleteInitiative);
    };
  }, [deleteInitiative]);

  // Sort initiatives by OP2 to group them together
  const sortedInitiatives = useMemo(() => {
    // Define the specific OP2 order
    const op2Order = [
      'Data definition',
      'Data capture',
      'Data processing',
      'Data assets',
      'FinOps'
    ];

    return [...initiatives].sort((a, b) => {
      // First sort by OP2 using the defined order
      const indexA = op2Order.indexOf(a.op2);
      const indexB = op2Order.indexOf(b.op2);

      if (indexA !== indexB) {
        return indexA - indexB;
      }

      // Then by order_index within the same OP2
      return a.order_index - b.order_index;
    });
  }, [initiatives]);

  // Extract OP1 value from first initiative
  const op1Value = sortedInitiatives.length > 0 ? sortedInitiatives[0].op1 : '';

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    resizable: true,
    wrapText: true,
    autoHeight: true,
  }), []);

  const onCellValueChanged = useCallback((event: CellValueChangedEvent) => {
    const updatedInitiative = event.data as Initiative;
    const field = event.column.getColId();

    // Store unsaved changes
    setUnsavedChanges(prev => {
      const newMap = new Map(prev);
      const existingChanges = newMap.get(updatedInitiative.id) || {};
      newMap.set(updatedInitiative.id, {
        ...existingChanges,
        [field]: event.newValue,
      });
      return newMap;
    });

    // Si se cambió la prioridad, refrescar todas las celdas de prioridad para actualizar la validación
    if (field === 'priority') {
      event.api.refreshCells({ columns: ['priority'], force: true });
    }
  }, []);

  const onRowDragEnd = useCallback((event: RowDragEndEvent) => {
    const draggedNode = event.node;
    const overNode = event.overNode;

    if (!overNode || !draggedNode.data || !overNode.data) return;

    // Check if both rows belong to same OP2 group
    if (draggedNode.data.op2 !== overNode.data.op2) {
      // Prevent reordering across different OP2 groups
      return;
    }

    // Get all current row data
    const allData: Initiative[] = [];
    event.api.forEachNode((node) => {
      if (node.data) {
        allData.push(node.data);
      }
    });

    // Find the indices
    const draggedIndex = allData.findIndex(item => item.id === draggedNode.data.id);
    const targetIndex = allData.findIndex(item => item.id === overNode.data.id);

    if (draggedIndex === -1 || targetIndex === -1) return;

    // Reorder the array
    const newData = [...allData];
    const [removed] = newData.splice(draggedIndex, 1);
    newData.splice(targetIndex, 0, removed);

    // Update the grid data immediately
    event.api.setGridOption('rowData', newData);

    // Calculate new order_index values for backend
    const updatedOrder: { id: string; order_index: number }[] = newData.map((item, index) => ({
      id: item.id,
      order_index: index,
    }));

    // Persist the new order to backend
    reorder(updatedOrder);
  }, [reorder]);

  return (
    <Box sx={{ height: 'calc(100vh - 250px)', width: '100%' }}>
      {/* OP1 Title Header */}
      <Box sx={{
        mb: 2,
        p: 2,
        bgcolor: falabellaColors.gray[100],
        borderLeft: `4px solid ${falabellaColors.green.main}`,
        borderRadius: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: falabellaColors.gray[900] }}>
          {op1Value}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            onClick={() => {
              // Save all unsaved changes
              unsavedChanges.forEach((changes, initiativeId) => {
                updateInitiative({ id: initiativeId, data: changes });
              });
              // Clear unsaved changes after save
              setUnsavedChanges(new Map());
            }}
            disabled={unsavedChanges.size === 0}
            sx={{
              bgcolor: falabellaColors.green.main,
              '&:hover': {
                bgcolor: falabellaColors.green.dark,
              },
              '&:disabled': {
                bgcolor: falabellaColors.gray[300],
              },
              fontWeight: 600,
              textTransform: 'none',
            }}
          >
            Guardar {unsavedChanges.size > 0 ? `(${unsavedChanges.size})` : ''}
          </Button>
          <Button
            variant="contained"
            onClick={() => exportInitiativesToExcel(sortedInitiatives)}
            sx={{
              bgcolor: falabellaColors.green.main,
              '&:hover': {
                bgcolor: falabellaColors.green.dark,
              },
              fontWeight: 600,
              textTransform: 'none',
            }}
          >
            Descargar Excel
          </Button>
        </Box>
      </Box>

      {/* AG Grid with Row Dragging */}
      <div className="ag-theme-material" style={{ height: 'calc(100% - 80px)', width: '100%' }}>
        <AgGridReact
          rowData={sortedInitiatives}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          components={{ ExpandButton, InitiativesCellRenderer, DeleteButtonRenderer, OP2CellRenderer, PriorityCellRenderer }}
          onCellValueChanged={onCellValueChanged}
          onRowDragEnd={onRowDragEnd}
          rowDragManaged={false}
          rowDragEntireRow={true}
          animateRows={true}
          rowSelection="multiple"
          pagination={true}
          paginationPageSize={50}
          paginationPageSizeSelector={[25, 50, 100]}
          suppressMovableColumns={false}
          suppressRowTransform={true}
          getRowClass={(params) => {
            if (!params.node || params.node.rowIndex === null) return '';

            const currentIndex = params.node.rowIndex;
            const prevNode = params.api.getDisplayedRowAtIndex(currentIndex - 1);
            const nextNode = params.api.getDisplayedRowAtIndex(currentIndex + 1);

            const isFirstInGroup = currentIndex === 0 ||
              (prevNode && prevNode.data && prevNode.data.op2 !== params.data?.op2);
            const isLastInGroup = !nextNode || !nextNode.data ||
              nextNode.data.op2 !== params.data?.op2;

            const classes = [];
            if (isFirstInGroup) classes.push('ag-row-first-in-group');
            if (isLastInGroup) classes.push('ag-row-last-in-group');

            return classes.join(' ');
          }}
        />
      </div>

      {/* Epics Dialog */}
      <Dialog
        open={epicsDialogOpen}
        onClose={() => setEpicsDialogOpen(false)}
        maxWidth="md"
        fullWidth
        disableRestoreFocus
        keepMounted={false}
        onKeyDown={(e) => e.stopPropagation()}
        onKeyUp={(e) => e.stopPropagation()}
        onKeyPress={(e) => e.stopPropagation()}
        slotProps={{
          backdrop: {
            onClick: (e) => e.stopPropagation()
          }
        }}
      >
        <DialogTitle>
          Épicas: {selectedInitiative?.initiatives}
        </DialogTitle>
        <DialogContent dividers>
          {selectedInitiative && <EpicDetailRenderer data={selectedInitiative} />}
        </DialogContent>
      </Dialog>
    </Box>
  );
};
