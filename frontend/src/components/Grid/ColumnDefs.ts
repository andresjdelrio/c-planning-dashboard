import { ColDef } from 'ag-grid-community';
import { op2Colors } from '../../utils/colors';

export const getOP2Color = (op2: string): string => {
  return op2Colors[op2] || '#FFFFFF';
};

export const columnDefs: ColDef[] = [
  {
    headerName: '',
    width: 50,
    rowDrag: true,
    pinned: 'left',
    cellClass: 'drag-handle',
    lockPosition: true,
  },
  {
    field: 'op2',
    headerName: 'OP2',
    width: 160,
    pinned: 'left',
    editable: false,
    sortable: false,
    cellStyle: (params: any) => {
      if (!params.node || params.node.rowIndex === null) return {};

      const currentIndex = params.node.rowIndex;
      const prevNode = params.api.getDisplayedRowAtIndex(currentIndex - 1);
      const nextNode = params.api.getDisplayedRowAtIndex(currentIndex + 1);

      const isFirstInGroup = currentIndex === 0 || (prevNode && prevNode.data && prevNode.data.op2 !== params.data?.op2);
      const isLastInGroup = !nextNode || !nextNode.data || nextNode.data.op2 !== params.data?.op2;

      return {
        fontWeight: 700,
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderTop: isFirstInGroup ? 'none' : 'none',
        borderBottom: isLastInGroup ? 'none' : 'none',
        borderLeft: 'none',
        borderRight: 'none',
        position: 'relative',
      };
    },
    cellClass: (params: any) => {
      if (!params.node || params.node.rowIndex === null) return '';

      const currentIndex = params.node.rowIndex;
      const prevNode = params.api.getDisplayedRowAtIndex(currentIndex - 1);
      const nextNode = params.api.getDisplayedRowAtIndex(currentIndex + 1);

      const isFirstInGroup = currentIndex === 0 || (prevNode && prevNode.data && prevNode.data.op2 !== params.data?.op2);
      const isLastInGroup = !nextNode || !nextNode.data || nextNode.data.op2 !== params.data?.op2;
      const isMiddleInGroup = !isFirstInGroup && !isLastInGroup;

      if (isFirstInGroup) return 'op2-cell-first';
      if (isLastInGroup) return 'op2-cell-last';
      if (isMiddleInGroup) return 'op2-cell-middle';
      return '';
    },
    cellRenderer: 'OP2CellRenderer',
  },
  {
    field: 'team',
    headerName: 'Team',
    width: 150,
    editable: true,
    cellEditor: 'agTextCellEditor',
    cellEditorParams: {
      maxLength: 100,
    },
  },
  {
    field: 'op3',
    headerName: 'OP3',
    width: 250,
    editable: true,
  },
  {
    field: 'platform',
    headerName: 'Platform',
    width: 200,
    editable: true,
  },
  {
    field: 'initiatives',
    headerName: 'Initiatives',
    width: 400,
    editable: true,
    cellRenderer: 'InitiativesCellRenderer',
  },
  {
    field: 'c',
    headerName: 'C',
    width: 80,
    editable: true,
    cellEditor: 'agTextCellEditor',
    cellEditorParams: {
      maxLength: 50,
    },
  },
  {
    field: 'effort_level',
    headerName: 'Effort Level',
    width: 130,
    editable: true,
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: ['TBD', 'Low', 'Medium', 'High', 'Very High'],
    },
  },
  {
    field: 'resource',
    headerName: 'Resource',
    width: 130,
    editable: true,
    cellEditor: 'agTextCellEditor',
    cellEditorParams: {
      maxLength: 50,
    },
  },
  {
    field: 'impact',
    headerName: 'Impact',
    width: 110,
    editable: true,
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: ['TBD', 'Low', 'Medium', 'High', 'Critical'],
    },
  },
  {
    field: 'priority',
    headerName: 'Priority',
    width: 110,
    editable: true,
    cellEditor: 'agTextCellEditor',
    cellClass: 'priority-cell',
    cellRenderer: 'PriorityCellRenderer',
  },
  {
    field: 'comments',
    headerName: 'Comentarios',
    width: 250,
    editable: true,
    cellEditor: 'agTextCellEditor',
    cellEditorParams: {
      maxLength: 500,
    },
  },
  {
    field: 'actions',
    headerName: '',
    width: 60,
    pinned: 'right',
    editable: false,
    sortable: false,
    cellRenderer: 'DeleteButtonRenderer',
    cellStyle: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
];
