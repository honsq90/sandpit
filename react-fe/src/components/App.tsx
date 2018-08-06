import * as React from 'react'
import 'bulma/css/bulma.css'
import SlideContainer from './SlideContainer'

interface AppProps { }

const App = ({ }: AppProps) => {
  return (
    <main>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
          </a>
          <div className="navbar-menu">
            <div className="navbar-start">
              <a className="navbar-item">Canvas</a>
            </div>
          </div>
        </div>
      </nav>
      <section className="section">
        <div className="container">
          <SlideContainer />
        </div>
      </section >
    </main>
  )
}

export default App
