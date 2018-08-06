import * as React from 'react'

interface SlideContainerProps {
  renderSlide: () => JSX.Element
}

const SlideContainer = ({ renderSlide }: SlideContainerProps) => {
  return (
    <section className="hero is-info is-fullheight has-text-centered">
      <div className="hero-body">
        {renderSlide()}
      </div>
    </section>
  )
}

export default SlideContainer
