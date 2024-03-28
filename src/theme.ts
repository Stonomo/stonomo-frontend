import { createTheme } from '@mui/material/styles';

// Create a theme instance.
export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#55add6',
    },
    error: {
      main: '#d6556d',
    },
  },
  spacing: 8,
});

export default theme;
