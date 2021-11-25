import { createTheme } from '@mui/material/styles';

export const colors = {
  primary: '#54d0aa',
  background: '#1a1a1a',
  flatground: '#292929',
  // primary: '#54d0aa',
  // background: '#fff',
  // flatground: '#eee'
};

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.primary,
    },
  },
});

export default theme;
