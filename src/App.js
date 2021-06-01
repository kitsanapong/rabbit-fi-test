import React from 'react'
import { useMediaQuery } from 'react-responsive'

import Desktop from './components/desktop/component'
import Mobile from './components/mobile/component'

import './App.scss';

function App() {
  const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 601px)'})
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 600px)' })
  return (
    <div className="App">
      {isDesktopOrLaptop && <Desktop/>}
      {isTabletOrMobile && <Mobile/>}
    </div>
  );
}

export default App;
