import { Box, Typography, Paper, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface Layer {
  title: string;
  subtitle: string;
  description: string;
  result: string;
}

const initialLayers: Layer[] = [
  {
    title: 'Identificación',
    subtitle: '¿Quién navega?',
    description: 'Persistente en sesión, relacionable cross-sesión.',
    result: 'Permite capturar la información que habilitará consolidar la identidad del cliente',
  },
  {
    title: 'Node_id',
    subtitle: '¿Dónde está?',
    description: 'Cada hit en que se permanece en la misma URL, mantiene node_id*.',
    result: 'Rrepresenta el nodo actual del journey',
  },
  {
    title: 'Motivo',
    subtitle: '¿Cómo llegó aquí?',
    description: 'Atribución y flujo de navegación, contiene node_id anterior y su última acción; Site_tag para cada pag.',
    result: 'Permite encadenar: node_001 → [acción X] → node_002 → [acción Y] → node_003',
  },
  {
    title: 'Acción',
    subtitle: '¿Qué hizo?',
    description: 'Interacciones, decisiones del cliente. Se mandan: Apenas llega (in), Durante (A2C...), A la salida (trigger out)',
    result: 'Captura señales de interés, preferencias y barreras',
  },
];

export const FourLayerModel = () => {
  const [layers, setLayers] = useState<Layer[]>(initialLayers);

  const handleChange = (index: number, field: keyof Layer, value: string) => {
    const newLayers = [...layers];
    newLayers[index] = { ...newLayers[index], [field]: value };
    setLayers(newLayers);
    localStorage.setItem('four-layer-model', JSON.stringify(newLayers));
  };

  return (
    <Box>
      <Typography variant="body1" paragraph>
        <strong>Framework que ordena las interacciones y sets de variables.</strong>
      </Typography>

      <Box sx={{ mt: 3 }}>
        {layers.map((layer, index) => (
          <Box key={index} sx={{ mb: 3 }}>
            <Grid container spacing={2} alignItems="stretch">
              {/* Capa (título) */}
              <Grid item xs={12} md={2}>
                <Paper
                  sx={{
                    p: 2,
                    bgcolor: '#424242',
                    color: 'white',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <TextField
                    value={layer.title}
                    onChange={(e) => handleChange(index, 'title', e.target.value)}
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      style: { color: 'white', fontWeight: 'bold', fontSize: '1.1rem' },
                    }}
                    fullWidth
                  />
                  <TextField
                    value={layer.subtitle}
                    onChange={(e) => handleChange(index, 'subtitle', e.target.value)}
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      style: { color: index === 1 ? '#B8DC28' : 'white', fontSize: '0.9rem' },
                    }}
                    fullWidth
                    sx={{ mt: 0.5 }}
                  />
                </Paper>
              </Grid>

              <Grid item xs={12} md={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ArrowForwardIcon sx={{ fontSize: 40, color: '#666' }} />
              </Grid>

              {/* Descripción */}
              <Grid item xs={12} md={4}>
                <Paper
                  sx={{
                    p: 2,
                    border: '1px solid #ddd',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <TextField
                    value={layer.description}
                    onChange={(e) => handleChange(index, 'description', e.target.value)}
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                    }}
                    multiline
                    fullWidth
                  />
                </Paper>
              </Grid>

              <Grid item xs={12} md={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ArrowForwardIcon sx={{ fontSize: 40, color: '#666' }} />
              </Grid>

              {/* Resultado */}
              <Grid item xs={12} md={4}>
                <Paper
                  sx={{
                    p: 2,
                    bgcolor: '#F5F5F5',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <TextField
                    value={layer.result}
                    onChange={(e) => handleChange(index, 'result', e.target.value)}
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                    }}
                    multiline
                    fullWidth
                  />
                </Paper>
              </Grid>
            </Grid>
          </Box>
        ))}
      </Box>

      <Box sx={{ mt: 3, p: 2, bgcolor: '#FFF3E0', borderRadius: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          Combinadas:
        </Typography>
        <Typography variant="body2" component="ul" sx={{ mt: 1 }}>
          <li>Permiten construir el <strong>rastro</strong> de lo que hizo el cliente.</li>
          <li>Para cada hit registrado, se debe decidir por <strong>cuánto tiempo se almacena</strong> hasta enviarse, y <strong>cuándo enviarse</strong>.</li>
          <li style={{ marginLeft: '2rem' }}>
            Acciones tienen 3 <strong>momentos de envío</strong>: in, hit y trigger out.
          </li>
          <li>
            * Analizar si efectivamente se <strong>debe taguear cada acción</strong> (A2C &lt;&gt; variant selection)
          </li>
        </Typography>
      </Box>
    </Box>
  );
};
