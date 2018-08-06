import * as React from 'react'
import 'bulma/css/bulma.css'
import SlideContainer from './SlideContainer'
import Slide1 from './slides/Slide1'
import Slide2 from './slides/Slide2'
import { fromEvent, Subscription, Observable } from 'rxjs'
import { tap, map, filter, share } from 'rxjs/operators'
import { log } from '../lib/pipe-console'

const slides = [
  Slide1,
  Slide2,
]

interface AppProps { }
interface AppState {
  slideIndex: number
}
class App extends React.Component<AppProps, AppState> {

  keyUp: Observable<KeyboardEvent>
  goNext$: Subscription
  goBack$: Subscription

  constructor(props: AppProps) {
    super(props)
    this.state = {
      slideIndex: 0,
    }

    this.keyUp = fromEvent(window, 'keyup').pipe(
      map((event: KeyboardEvent) => event.code),
      log(),
      share(),
    )

    this.goNext$ = this.keyUp.pipe(
      filter((code: string) => code === 'ArrowRight' || code === 'Space')
    ).subscribe(() => {
      const { slideIndex } = this.state
      const newSlideIndex = Math.min(slides.length - 1, slideIndex + 1)
      this.setState({ slideIndex: newSlideIndex })
    })

    this.goBack$ = this.keyUp.pipe(
      filter((code: string) => code === 'ArrowLeft')
    ).subscribe(() => {
      const { slideIndex } = this.state
      const newSlideIndex = Math.max(0, slideIndex - 1)
      this.setState({ slideIndex: newSlideIndex })
    })

  }

  componentWillUnmount() {
    this.goNext$.unsubscribe()
    this.goBack$.unsubscribe()
  }

  render() {
    const { slideIndex } = this.state
    return (
      <main>
        <SlideContainer renderSlide={slides[slideIndex]} />
      </main>
    )
  }
}

export default App
