import { AppBar, Toolbar, Typography, Button, Box, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SyncIcon from '@mui/icons-material/Sync';
import { falabellaColors } from '../../utils/colors';

interface HeaderProps {
  onAddClick: () => void;
  onSyncClick: () => void;
  totalInitiatives: number;
}

export const Header = ({ onAddClick, onSyncClick, totalInitiatives }: HeaderProps) => {
  return (
    <AppBar position="static" sx={{ backgroundColor: falabellaColors.green.main }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 400,
              color: 'white',
              fontFamily: 'Arial, sans-serif',
            }}
          >
            falabella.com
          </Typography>
          <Typography variant="h5" component="div" sx={{ fontWeight: 700, color: 'white' }}>
            C - Planning Dashboard
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Chip
            label={`Total: ${totalInitiatives}`}
            color="secondary"
            sx={{ fontWeight: 600 }}
          />

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAddClick}
            sx={{
              backgroundColor: falabellaColors.orange.main,
              '&:hover': {
                backgroundColor: falabellaColors.orange.dark,
              },
            }}
          >
            Add Initiative
          </Button>

          <Button
            variant="outlined"
            startIcon={<SyncIcon />}
            onClick={onSyncClick}
            sx={{
              color: 'white',
              borderColor: 'white',
              '&:hover': {
                borderColor: 'white',
                backgroundColor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            Sync
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
