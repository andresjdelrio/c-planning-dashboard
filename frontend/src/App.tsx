import { useState } from 'react';
import { Box, CircularProgress, Container, Typography, Alert } from '@mui/material';
import { useInitiatives } from './hooks/useInitiatives';
import { Header } from './components/Layout/Header';
import { InitiativesGrid } from './components/Grid/InitiativesGrid';
import { AddInitiativeDialog } from './components/Dialogs/AddInitiativeDialog';
import { FrameworkDocumentation } from './components/Documentation/FrameworkDocumentation';

function App() {
  const { data: initiatives, isLoading, error, refetch } = useInitiatives();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddClick = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);
  const handleSyncClick = () => refetch();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">
          <Typography variant="h6">Error loading initiatives</Typography>
          <Typography variant="body2">
            {(error as Error).message}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Make sure the backend is running on http://localhost:3001
          </Typography>
        </Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Header
        onAddClick={handleAddClick}
        onSyncClick={handleSyncClick}
        totalInitiatives={initiatives?.length || 0}
      />

      <Container maxWidth={false} sx={{ py: 3 }}>
        {initiatives && initiatives.length > 0 ? (
          <>
            <InitiativesGrid initiatives={initiatives} />
            <FrameworkDocumentation />
          </>
        ) : (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              No initiatives yet
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Click "Add Initiative" to create your first one
            </Typography>
          </Box>
        )}
      </Container>

      <AddInitiativeDialog open={dialogOpen} onClose={handleDialogClose} />
    </Box>
  );
}

export default App;
