import { Box, Typography, Paper, Grid, TextField } from '@mui/material';
import { useState } from 'react';

interface DataType {
  title: string;
  description: string;
  examples: string[];
}

const initialDataTypes: DataType[] = [
  {
    title: 'Evento',
    description: 'Acciones que se desean capturar.',
    examples: [
      '"Añadir al carrito un producto"',
      '"Buscar en Search"',
      '"Click a tabla de tallas en la PDP"',
    ],
  },
  {
    title: 'Dimensión',
    description: 'Información que se desea capturar en respuesta a una Acción.',
    examples: [
      '"Palabra Buscada"',
      '"¿Página donde estoy?"',
    ],
  },
  {
    title: 'List',
    description: 'Listado de features que el usuario vio o cargó al navegar en la página sin necesariamente hacer click sobre un elemento de la misma.',
    examples: [
      '"Listado de elementos impresos"',
      '"Cantidad de productos patrocinados que aparecen en una PLP"',
    ],
  },
  {
    title: 'Layer',
    description: 'Asignar las marcas a la capa del modelo (4L), y a su correspondiente contexto.\n\nEl contexto está dado, en su capa superior, por el módulo en donde se genera (XLP, Home, PDP,...)\n\nDefinir reglas de envío y persistencia de la información',
    examples: [],
  },
];

export const DataTypes = () => {
  const [dataTypes, setDataTypes] = useState<DataType[]>(initialDataTypes);

  const handleChange = (index: number, field: keyof DataType, value: string | string[]) => {
    const newDataTypes = [...dataTypes];
    newDataTypes[index] = { ...newDataTypes[index], [field]: value };
    setDataTypes(newDataTypes);
    localStorage.setItem('data-types', JSON.stringify(newDataTypes));
  };

  return (
    <Box>
      <Typography variant="body1" paragraph>
        Existen diferentes maneras de guardar la información y de capturarla para que los datos comuniquen ideas claras.
      </Typography>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {dataTypes.map((type, index) => (
          <Grid item xs={12} md={6} lg={3} key={index}>
            <Paper
              sx={{
                p: 2,
                height: '100%',
                bgcolor: index === 3 ? '#F5F5F5' : 'white',
                border: '1px solid #ddd',
              }}
            >
              <Box
                sx={{
                  bgcolor: '#424242',
                  color: 'white',
                  p: 1.5,
                  borderRadius: 1,
                  textAlign: 'center',
                  mb: 2,
                }}
              >
                <TextField
                  value={type.title}
                  onChange={(e) => handleChange(index, 'title', e.target.value)}
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                    style: {
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '1.2rem',
                      textAlign: 'center',
                    },
                  }}
                  fullWidth
                />
              </Box>

              <TextField
                value={type.description}
                onChange={(e) => handleChange(index, 'description', e.target.value)}
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                }}
                multiline
                fullWidth
                sx={{ mb: 2 }}
              />

              {type.examples.length > 0 && (
                <Box>
                  {type.examples.map((example, exIdx) => (
                    <TextField
                      key={exIdx}
                      value={example}
                      onChange={(e) => {
                        const newExamples = [...type.examples];
                        newExamples[exIdx] = e.target.value;
                        handleChange(index, 'examples', newExamples);
                      }}
                      variant="standard"
                      InputProps={{
                        disableUnderline: true,
                      }}
                      fullWidth
                      sx={{ mb: 1, fontSize: '0.9rem' }}
                    />
                  ))}
                </Box>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
