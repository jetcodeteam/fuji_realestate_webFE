import { red } from '@material-ui/core/colors';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

// A custom theme for this app
let theme = createMuiTheme({
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

theme = responsiveFontSizes(theme);

export default theme;
