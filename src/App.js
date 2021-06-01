import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Desktop from './components/desktop/component'
import Mobile from './components/mobile/component'

import './App.scss';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff9000',
      contrastText: '#fff',
    },
    secondary: { main: '#0066cc'},
  },
});

function App() {
  const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 601px)'})
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 600px)' })
  return (
      <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <div className="App">
          {isDesktopOrLaptop && <Desktop/>}
          {isTabletOrMobile && <Mobile/>}
        </div>
      </MuiPickersUtilsProvider>
      </ThemeProvider>
  );
}

export default App;
