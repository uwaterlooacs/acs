import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: "light",
    background: {
      default: '#fff'
    },
    text: {
      primary: 'rgb(30, 30, 30)',
      secondary: 'rgb(86, 86, 86)'
    },
    primary: {
      main: 'rgb(245, 245, 245)'
    },
    secondary: {
      main: 'rgb(235, 235, 235)'
    },
    success: {
      main: '#2ed573'
    },
    error: {
      main: '#ff4757'
    }
  }
});

export default { ...theme, name: 'light' };
