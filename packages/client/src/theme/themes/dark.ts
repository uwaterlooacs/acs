import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#1e1e1e',
    },
    text: {
      primary: '#f1f2f6',
      secondary: '#ced6e0',
    },
    primary: {
      main: '#3498db',
    },
    secondary: {
      main: '#34495e',
    },
    success: {
      main: '#7bed9f',
    },
    error: {
      main: '#ff6b81',
    },
  },
});

export default { ...theme, name: 'dark' };
