import { createTheme } from '@mui/material/styles';
import { falabellaColors } from '../utils/colors';

export const theme = createTheme({
  palette: {
    primary: {
      main: falabellaColors.green.main,
      light: falabellaColors.green.light,
      dark: falabellaColors.green.dark,
    },
    secondary: {
      main: falabellaColors.orange.main,
      light: falabellaColors.orange.light,
      dark: falabellaColors.orange.dark,
    },
    error: {
      main: falabellaColors.red.main,
      light: falabellaColors.red.light,
      dark: falabellaColors.red.dark,
    },
    info: {
      main: falabellaColors.blue.main,
      light: falabellaColors.blue.light,
      dark: falabellaColors.blue.dark,
    },
    background: {
      default: falabellaColors.gray[100],
      paper: falabellaColors.white,
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 500 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
  },
});
