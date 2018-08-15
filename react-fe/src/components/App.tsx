import * as React from 'react'
import 'bulma/css/bulma.css'
import SlideContainer from './SlideContainer'
import Slide1 from './slides/Slide1'
import Slide2 from './slides/Slide2'
import { fromEvent, Subscription, Observable } from 'rxjs'
import { map, filter, share } from 'rxjs/operators'

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

    this.keyUp = fromEvent(document, 'keydown').pipe(
      map((event: KeyboardEvent) => event.key),
      share(),
    )

    this.goNext$ = this.keyUp.pipe(
      filter((key: string) => key === 'ArrowRight' || key === 'Space')
    ).subscribe(() => {
      this.goNext()
    })

    this.goBack$ = this.keyUp.pipe(
      filter((key: string) => key === 'ArrowLeft')
    ).subscribe(() => {
      this.goBack()
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
    const { slideIndex } = this.state
    return (
      <main onClick={() => this.goNext()}>
        <SlideContainer renderSlide={slides[slideIndex]} />
      </main>
    )
  }
}

export default App
