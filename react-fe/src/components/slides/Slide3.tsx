import * as React from 'react'

export default () => (
  <div className="container">
    <h1 className="title">
      False Positives
    </h1>

    <ul>
      <li>What really went wrong when the Selenium test failed?</li>
      <li>Is it actually a failing API or is it just Selenium again?</li>
      <li>Why doesn't it run on {`{browser}`} any more?</li>
    </ul>
  </div>
)
