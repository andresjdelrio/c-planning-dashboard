import { ICellRendererParams } from 'ag-grid-community';

export const OP2CellRenderer = (params: ICellRendererParams) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontSize: '14px',
        height: '100%',
        width: '100%',
      }}
    >
      {params.value}
    </div>
  );
};
