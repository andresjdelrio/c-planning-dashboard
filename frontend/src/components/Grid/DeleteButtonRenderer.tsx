import { ICellRendererParams } from 'ag-grid-community';
import { useState } from 'react';

export const DeleteButtonRenderer = (props: ICellRendererParams) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    if (showConfirm) {
      window.dispatchEvent(new CustomEvent('deleteInitiative', { detail: props.data }));
      setShowConfirm(false);
    } else {
      setShowConfirm(true);
      // Reset confirmation after 3 seconds
      setTimeout(() => setShowConfirm(false), 3000);
    }
  };

  return (
    <button
      onClick={handleDelete}
      style={{
        border: 'none',
        background: showConfirm ? '#EF4444' : '#DC2626',
        color: 'white',
        borderRadius: '4px',
        cursor: 'pointer',
        padding: '4px 8px',
        fontSize: '14px',
        fontWeight: 'bold',
        transition: 'background 0.2s',
      }}
      title={showConfirm ? 'Click again to confirm' : 'Delete initiative'}
    >
      {showConfirm ? '✓' : '×'}
    </button>
  );
};
