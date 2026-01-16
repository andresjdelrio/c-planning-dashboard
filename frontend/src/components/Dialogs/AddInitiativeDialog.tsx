import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
} from '@mui/material';
import { InitiativeCreate } from '../../types/initiative';
import { useCreateInitiative } from '../../hooks/useInitiatives';

interface AddInitiativeDialogProps {
  open: boolean;
  onClose: () => void;
}

export const AddInitiativeDialog = ({ open, onClose }: AddInitiativeDialogProps) => {
  const createMutation = useCreateInitiative();

  const [formData, setFormData] = useState<InitiativeCreate>({
    op1: 'Provide data & insights in time and in form',
    op2: 'Data definition',
    team: 'Nav',
    op3: '',
    platform: '',
    initiatives: '',
    c: 'C1',
    effort_level: 'Medium',
    resource: 'DA',
    impact: 'Medium',
    priority: 'TBD',
    order_index: 0,
  });

  const handleChange = (field: keyof InitiativeCreate, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    createMutation.mutate(formData, {
      onSuccess: () => {
        onClose();
        setFormData({
          op1: 'Provide data & insights in time and in form',
          op2: 'Data definition',
          team: 'Nav',
          op3: '',
          platform: '',
          initiatives: '',
          c: 'C1',
          effort_level: 'Medium',
          resource: 'DA',
          impact: 'Medium',
          priority: 'TBD',
          order_index: 0,
        });
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Add New Initiative</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="OP1"
              value={formData.op1}
              onChange={(e) => handleChange('op1', e.target.value)}
              disabled
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              select
              label="OP2"
              value={formData.op2}
              onChange={(e) => handleChange('op2', e.target.value)}
            >
              <MenuItem value="Data definition">Data definition</MenuItem>
              <MenuItem value="Data capture">Data capture</MenuItem>
              <MenuItem value="Data processing">Data processing</MenuItem>
              <MenuItem value="Data assets">Data assets</MenuItem>
              <MenuItem value="FinOps">FinOps</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              select
              label="Team"
              value={formData.team}
              onChange={(e) => handleChange('team', e.target.value)}
            >
              <MenuItem value="Nav">Nav</MenuItem>
              <MenuItem value="Nav + Socorp">Nav + Socorp</MenuItem>
              <MenuItem value="Nav + Tocorp + FSC">Nav + Tocorp + FSC</MenuItem>
              <MenuItem value="Socorp">Socorp</MenuItem>
              <MenuItem value="Tocorp">Tocorp</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="OP3"
              value={formData.op3}
              onChange={(e) => handleChange('op3', e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Platform"
              value={formData.platform}
              onChange={(e) => handleChange('platform', e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Initiatives"
              value={formData.initiatives}
              onChange={(e) => handleChange('initiatives', e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              fullWidth
              select
              label="C"
              value={formData.c}
              onChange={(e) => handleChange('c', e.target.value)}
            >
              <MenuItem value="C1">C1</MenuItem>
              <MenuItem value="C2">C2</MenuItem>
              <MenuItem value="C3">C3</MenuItem>
              <MenuItem value="C4">C4</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={3}>
            <TextField
              fullWidth
              select
              label="Effort Level"
              value={formData.effort_level}
              onChange={(e) => handleChange('effort_level', e.target.value)}
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Very High">Very High</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={3}>
            <TextField
              fullWidth
              select
              label="Resource"
              value={formData.resource}
              onChange={(e) => handleChange('resource', e.target.value)}
            >
              <MenuItem value="PO">PO</MenuItem>
              <MenuItem value="DA">DA</MenuItem>
              <MenuItem value="DE">DE</MenuItem>
              <MenuItem value="DA + DE">DA + DE</MenuItem>
              <MenuItem value="PO + DA">PO + DA</MenuItem>
              <MenuItem value="All">All</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={3}>
            <TextField
              fullWidth
              select
              label="Impact"
              value={formData.impact}
              onChange={(e) => handleChange('impact', e.target.value)}
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Critical">Critical</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              select
              label="Priority"
              value={formData.priority}
              onChange={(e) => handleChange('priority', e.target.value)}
            >
              <MenuItem value="P1">P1</MenuItem>
              <MenuItem value="P2">P2</MenuItem>
              <MenuItem value="P3">P3</MenuItem>
              <MenuItem value="TBD">TBD</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!formData.op3 || !formData.initiatives || createMutation.isPending}
        >
          {createMutation.isPending ? 'Creating...' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
