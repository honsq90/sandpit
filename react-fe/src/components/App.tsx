import * as React from 'react'
import 'bulma/css/bulma.css'
import SlideContainer from './SlideContainer'
import Slide1 from './slides/Slide1'

const App = () => {
  return (
    <main>
      <SlideContainer renderSlide={Slide1} />
    </main>
  )
}

export default App
