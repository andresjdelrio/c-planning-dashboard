import { Box, Typography, Paper, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface BlockData {
  motivo_in: {
    prev_node_id: string;
    prev_url: string;
    trigger_action: string;
  };
  node: {
    node_id: string;
    url: string;
    context: string;
    page_name: string;
    page_type: string;
    elements: string;
  };
  acciones: {
    impresiones: string;
    a2c: string;
    swipe: string;
    trigger_out: string;
  };
}

interface BlockchainData {
  identification: {
    visit_id: string;
    user_id: string;
    device: string;
    context_id: string;
  };
  blocks: BlockData[];
}

const initialBlockchainData: BlockchainData = {
  identification: {
    visit_id: 'Visit_id',
    user_id: 'User_id',
    device: 'Device',
    context_id: 'context_id',
  },
  blocks: [
    {
      motivo_in: {
        prev_node_id: 'node_000',
        prev_url: '/home',
        trigger_action: 'click_banner',
      },
      node: {
        node_id: 'node_001',
        url: '/category/shoes',
        context: 'PLP',
        page_name: 'Zapatos',
        page_type: 'Category',
        elements: 'Product cards, Filters, Sort',
      },
      acciones: {
        impresiones: '24 products viewed',
        a2c: '2 items added',
        swipe: '5 swipes',
        trigger_out: 'click_product',
      },
    },
    {
      motivo_in: {
        prev_node_id: 'node_001',
        prev_url: '/category/shoes',
        trigger_action: 'click_product',
      },
      node: {
        node_id: 'node_002',
        url: '/product/123456',
        context: 'PDP',
        page_name: 'Zapatillas Nike Air',
        page_type: 'Product',
        elements: 'Images, Size selector, A2C button',
      },
      acciones: {
        impresiones: 'Size guide viewed',
        a2c: '1 item added',
        swipe: '3 image swipes',
        trigger_out: 'go_to_cart',
      },
    },
  ],
};

export const BlockchainModel = () => {
  const [blockchainData, setBlockchainData] = useState<BlockchainData>(initialBlockchainData);

  const handleIdentificationChange = (field: keyof BlockchainData['identification'], value: string) => {
    const newData = {
      ...blockchainData,
      identification: {
        ...blockchainData.identification,
        [field]: value,
      },
    };
    setBlockchainData(newData);
    localStorage.setItem('blockchain-model', JSON.stringify(newData));
  };

  const handleBlockChange = (
    blockIndex: number,
    section: keyof BlockData,
    field: string,
    value: string
  ) => {
    const newBlocks = [...blockchainData.blocks];
    newBlocks[blockIndex] = {
      ...newBlocks[blockIndex],
      [section]: {
        ...newBlocks[blockIndex][section],
        [field]: value,
      },
    };
    const newData = { ...blockchainData, blocks: newBlocks };
    setBlockchainData(newData);
    localStorage.setItem('blockchain-model', JSON.stringify(newData));
  };

  return (
    <Box>
      <Typography variant="body1" paragraph>
        <strong>Modelo de bloques encadenados para representar el Customer Journey</strong>
      </Typography>

      {/* Identification Layer */}
      <Paper
        sx={{
          p: 2,
          mb: 3,
          bgcolor: '#B8DC28',
          border: '2px solid #424242',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Identificación
        </Typography>
        <Grid container spacing={2}>
          {(Object.keys(blockchainData.identification) as Array<keyof BlockchainData['identification']>).map((key) => (
            <Grid item xs={12} sm={6} md={3} key={key}>
              <TextField
                label={key.replace('_', ' ')}
                value={blockchainData.identification[key]}
                onChange={(e) => handleIdentificationChange(key, e.target.value)}
                variant="outlined"
                size="small"
                fullWidth
                sx={{
                  bgcolor: 'white',
                  '& .MuiInputLabel-root': { fontWeight: 600 },
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Blockchain Blocks */}
      <Box sx={{ display: 'flex', alignItems: 'center', overflowX: 'auto', pb: 2 }}>
        {blockchainData.blocks.map((block, blockIndex) => (
          <Box key={blockIndex} sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <Paper
              sx={{
                p: 2,
                width: 350,
                border: '2px solid #424242',
                bgcolor: '#F5F5F5',
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, textAlign: 'center' }}>
                Block {blockIndex + 1}
              </Typography>

              {/* Motivo In */}
              <Box sx={{ mb: 2, p: 1.5, bgcolor: '#FFE5E5', borderRadius: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                  Motivo In
                </Typography>
                <TextField
                  label="Prev Node ID"
                  value={block.motivo_in.prev_node_id}
                  onChange={(e) => handleBlockChange(blockIndex, 'motivo_in', 'prev_node_id', e.target.value)}
                  variant="standard"
                  size="small"
                  fullWidth
                  sx={{ mb: 1 }}
                />
                <TextField
                  label="Prev URL"
                  value={block.motivo_in.prev_url}
                  onChange={(e) => handleBlockChange(blockIndex, 'motivo_in', 'prev_url', e.target.value)}
                  variant="standard"
                  size="small"
                  fullWidth
                  sx={{ mb: 1 }}
                />
                <TextField
                  label="Trigger Action"
                  value={block.motivo_in.trigger_action}
                  onChange={(e) => handleBlockChange(blockIndex, 'motivo_in', 'trigger_action', e.target.value)}
                  variant="standard"
                  size="small"
                  fullWidth
                />
              </Box>

              {/* Node */}
              <Box sx={{ mb: 2, p: 1.5, bgcolor: '#E3F2FD', borderRadius: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                  Node
                </Typography>
                <TextField
                  label="Node ID"
                  value={block.node.node_id}
                  onChange={(e) => handleBlockChange(blockIndex, 'node', 'node_id', e.target.value)}
                  variant="standard"
                  size="small"
                  fullWidth
                  sx={{ mb: 1 }}
                />
                <TextField
                  label="URL"
                  value={block.node.url}
                  onChange={(e) => handleBlockChange(blockIndex, 'node', 'url', e.target.value)}
                  variant="standard"
                  size="small"
                  fullWidth
                  sx={{ mb: 1 }}
                />
                <TextField
                  label="Context"
                  value={block.node.context}
                  onChange={(e) => handleBlockChange(blockIndex, 'node', 'context', e.target.value)}
                  variant="standard"
                  size="small"
                  fullWidth
                  sx={{ mb: 1 }}
                />
                <TextField
                  label="Page Name"
                  value={block.node.page_name}
                  onChange={(e) => handleBlockChange(blockIndex, 'node', 'page_name', e.target.value)}
                  variant="standard"
                  size="small"
                  fullWidth
                  sx={{ mb: 1 }}
                />
                <TextField
                  label="Page Type"
                  value={block.node.page_type}
                  onChange={(e) => handleBlockChange(blockIndex, 'node', 'page_type', e.target.value)}
                  variant="standard"
                  size="small"
                  fullWidth
                  sx={{ mb: 1 }}
                />
                <TextField
                  label="Elements"
                  value={block.node.elements}
                  onChange={(e) => handleBlockChange(blockIndex, 'node', 'elements', e.target.value)}
                  variant="standard"
                  size="small"
                  fullWidth
                  multiline
                />
              </Box>

              {/* Acciones */}
              <Box sx={{ p: 1.5, bgcolor: '#F3E5F5', borderRadius: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                  Acciones
                </Typography>
                <TextField
                  label="Impresiones"
                  value={block.acciones.impresiones}
                  onChange={(e) => handleBlockChange(blockIndex, 'acciones', 'impresiones', e.target.value)}
                  variant="standard"
                  size="small"
                  fullWidth
                  sx={{ mb: 1 }}
                />
                <TextField
                  label="A2C"
                  value={block.acciones.a2c}
                  onChange={(e) => handleBlockChange(blockIndex, 'acciones', 'a2c', e.target.value)}
                  variant="standard"
                  size="small"
                  fullWidth
                  sx={{ mb: 1 }}
                />
                <TextField
                  label="Swipe"
                  value={block.acciones.swipe}
                  onChange={(e) => handleBlockChange(blockIndex, 'acciones', 'swipe', e.target.value)}
                  variant="standard"
                  size="small"
                  fullWidth
                  sx={{ mb: 1 }}
                />
                <TextField
                  label="Trigger Out"
                  value={block.acciones.trigger_out}
                  onChange={(e) => handleBlockChange(blockIndex, 'acciones', 'trigger_out', e.target.value)}
                  variant="standard"
                  size="small"
                  fullWidth
                />
              </Box>
            </Paper>

            {blockIndex < blockchainData.blocks.length - 1 && (
              <ArrowForwardIcon sx={{ fontSize: 60, color: '#424242', mx: 2 }} />
            )}
          </Box>
        ))}
      </Box>

      <Box sx={{ mt: 3, p: 2, bgcolor: '#FFF3E0', borderRadius: 1 }}>
        <Typography variant="body2" sx={{ fontStyle: 'italic', textAlign: 'center' }}>
          <strong>Nuestro clickstream es como TCP para customer journeys:</strong> cada "paquete" (hit)
          lleva información de dónde viene, dónde está, y hacia dónde va, permitiendo reconstruir
          el journey completo incluso si los hits llegan desordenados.
        </Typography>
      </Box>
    </Box>
  );
};
