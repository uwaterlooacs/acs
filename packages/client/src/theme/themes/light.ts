import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'light',
    background: {
      default: '#fff',
      paper: '#ecf0f1',
    },
    text: {
      primary: 'rgb(30, 30, 30)',
      secondary: 'rgb(86, 86, 86)',
    },
    primary: {
      main: '#3498db',
    },
    secondary: {
      main: '#34495e',
    },
    success: {
      main: '#2ed573',
    },
    error: {
      main: '#ff4757',
    },
  },
});

export default { ...theme, name: 'light' };
