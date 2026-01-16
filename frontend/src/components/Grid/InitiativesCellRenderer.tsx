import { ICellRendererParams } from 'ag-grid-community';

export const InitiativesCellRenderer = (props: ICellRendererParams) => {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent('openEpics', { detail: props.data }));
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
      <span style={{ flex: 1 }}>{props.value}</span>
      <button
        onClick={handleClick}
        style={{
          border: 'none',
          background: '#3B82F6',
          color: 'white',
          borderRadius: '4px',
          cursor: 'pointer',
          padding: '2px 6px',
          fontSize: '14px',
          fontWeight: 'bold',
          flexShrink: 0,
        }}
      >
        +
      </button>
    </div>
  );
};
