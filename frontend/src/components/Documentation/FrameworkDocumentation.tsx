import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FourLayerModel } from './FourLayerModel';
import { DataTypes } from './DataTypes';
import { BlockchainModel } from './BlockchainModel';

export const FrameworkDocumentation = () => {
  return (
    <Box sx={{ mt: 4, mb: 4, px: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
        Framework de Navegación - Modelo de 4 Capas
      </Typography>

      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            1. Modelo de 4 Capas
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FourLayerModel />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            2. Tipos de Marca según Uso y Objetivo
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DataTypes />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            3. Modelo Blockchain del Customer Journey
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <BlockchainModel />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
