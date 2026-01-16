import { ICellRendererParams } from 'ag-grid-community';

export const PriorityCellRenderer = (params: ICellRendererParams) => {
  const priority = params.value;

  // Si está vacío o es TBD, dejar en blanco
  if (!priority || priority === 'TBD' || priority.trim() === '') {
    return <div style={{ textAlign: 'center' }}>{priority || ''}</div>;
  }

  // Convertir a número si es posible
  const priorityNum = parseInt(priority);

  // Si no es un número, dejar sin color
  if (isNaN(priorityNum)) {
    return <div style={{ textAlign: 'center' }}>{priority}</div>;
  }

  // Contar cuántas veces aparece esta prioridad en todas las filas
  let count = 0;
  params.api.forEachNode((node) => {
    if (node.data?.priority === priority && priority !== 'TBD') {
      count++;
    }
  });

  // Definir colores del heatmap (del más llamativo al menos llamativo)
  let backgroundColor = '#FFFFFF';
  let textColor = '#000000';

  if (priorityNum === 1) {
    backgroundColor = '#E31E24'; // Rojo Falabella intenso
    textColor = '#FFFFFF';
  } else if (priorityNum === 2) {
    backgroundColor = '#FF5252'; // Rojo medio
    textColor = '#FFFFFF';
  } else if (priorityNum === 3) {
    backgroundColor = '#FF7043'; // Naranja-rojo
    textColor = '#FFFFFF';
  } else if (priorityNum === 4) {
    backgroundColor = '#FFA726'; // Naranja
    textColor = '#000000';
  } else if (priorityNum === 5) {
    backgroundColor = '#FFCA28'; // Amarillo-naranja
    textColor = '#000000';
  } else if (priorityNum === 6) {
    backgroundColor = '#FFF176'; // Amarillo claro
    textColor = '#000000';
  } else if (priorityNum === 7) {
    backgroundColor = '#DCE775'; // Amarillo-verde
    textColor = '#000000';
  } else if (priorityNum === 8) {
    backgroundColor = '#AED581'; // Verde claro
    textColor = '#000000';
  } else if (priorityNum >= 9) {
    backgroundColor = '#E8F5E9'; // Verde muy claro
    textColor = '#000000';
  }

  const baseStyle: React.CSSProperties = {
    backgroundColor,
    color: textColor,
    fontWeight: 'bold',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  };

  // Si hay duplicados, agregar borde rojo
  if (count > 1) {
    return (
      <div
        style={{
          ...baseStyle,
          border: '3px solid #D32F2F',
          boxShadow: '0 0 8px rgba(211, 47, 47, 0.5)',
        }}
      >
        {priority}
      </div>
    );
  }

  return <div style={baseStyle}>{priority}</div>;
};
