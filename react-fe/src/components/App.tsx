import 'bulma/css/bulma.css'
import * as React from 'react'
import { fromEvent, Observable, Subscription, interval } from 'rxjs'
import { filter, map, share } from 'rxjs/operators'
import { detect } from 'detect-browser'

import SlideContainer from './SlideContainer'
import Slide0 from './slides/Slide0'
import Slide2 from './slides/Slide2'
import Slide3 from './slides/Slide3'
import Slide4 from './slides/Slide4'
import Slide1 from './slides/Slide1'
import Slide5 from './slides/Slide5'
import Slide6 from './slides/Slide6'
import Slide7 from './slides/Slide7'
import Slide8 from './slides/Slide8'
import Slide9 from './slides/Slide9'
import Slide10 from './slides/Slide10'
import Slide11 from './slides/Slide11'
import Slide12 from './slides/Slide12'

const slides = [
  Slide0,
  Slide1,
  Slide2,
  Slide3,
  Slide4,
  Slide5,
  Slide6,
  Slide7,
  Slide8,
  Slide9,
  Slide10,
  Slide11,
  Slide12,
]

interface AppProps { }
interface AppState {
  slideIndex: number,
  elapsed: number,
}
const KEYCODE_SPACE = 32
const KEYCODE_RIGHT = 39
const KEYCODE_LEFT = 37

class App extends React.Component<AppProps, AppState> {

  keyUp: Observable<KeyboardEvent>
  goNext$: Subscription
  goBack$: Subscription

  constructor(props: AppProps) {
    super(props)
    this.state = {
      slideIndex: 0,
      elapsed: 0,
    }

    Object.defineProperty(window, 'testcafe', {
      value: detect()
    })

    this.keyUp = fromEvent(document, 'keydown')
      .pipe(
        map((event: KeyboardEvent) => event.keyCode),
        share(),
      )

    this.goNext$ = this.keyUp
      .pipe(
        filter((key: number) => key === KEYCODE_RIGHT || key === KEYCODE_SPACE)
      ).subscribe(() => {
        this.goNext()
      })

    this.goBack$ = this.keyUp
      .pipe(
        filter((key: number) => key === KEYCODE_LEFT)
      ).subscribe(() => {
        this.goBack()
      })
    this.startTimer()

  }

  startTimer() {
    interval(1000)
      .subscribe(() => {
        this.setState({ elapsed: this.state.elapsed + 1 })
      })
  }

  goBack() {
    const { slideIndex } = this.state
    const newSlideIndex = Math.max(0, slideIndex - 1)
    this.setState({ slideIndex: newSlideIndex })
  }

  goNext() {
    const { slideIndex } = this.state
    const newSlideIndex = Math.min(slides.length - 1, slideIndex + 1)
    this.setState({ slideIndex: newSlideIndex })
  }

  componentWillUnmount() {
    this.goNext$.unsubscribe()
    this.goBack$.unsubscribe()
  }

  render() {
    const { slideIndex, elapsed } = this.state
    const minutes = `${Math.floor(elapsed / 60)}`.padStart(2, '0')
    const seconds = `${(elapsed % 60)}`.padStart(2, '0')
    return (
      <main onClick={() => this.goNext()}>
        <div id="timer">
          {minutes}:{seconds}
        </div>
        <SlideContainer renderSlide={slides[slideIndex]} />
      </main>
    )
  }
}

export default App
