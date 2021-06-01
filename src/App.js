import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import Desktop from './components/desktop/component'
import Mobile from './components/mobile/component'

import './App.scss';

function App() {
  const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 601px)'})
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 600px)' })
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <div className="App">
        {isDesktopOrLaptop && <Desktop/>}
        {isTabletOrMobile && <Mobile/>}
      </div>
    </MuiPickersUtilsProvider>
  );
}

export default App;
