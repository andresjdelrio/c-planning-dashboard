import { ICellRendererParams } from 'ag-grid-community';

export const ExpandButton = (props: ICellRendererParams) => {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent('openEpics', { detail: props.data }));
  };

  return (
    <button
      onClick={handleClick}
      style={{
        border: 'none',
        background: '#3B82F6',
        color: 'white',
        borderRadius: '4px',
        cursor: 'pointer',
        padding: '4px 8px',
        fontSize: '16px',
        fontWeight: 'bold',
      }}
    >
      +
    </button>
  );
};
