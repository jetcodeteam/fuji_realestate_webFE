import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#109CF1',
    },
    secondary: {
      main: '#dc004e',
    },
    error: {
      main: red.A400,
    },
    corlor: {
      main: '#241f21',
    },
  },
});

export default theme;
