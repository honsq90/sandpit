import * as React from 'react'

const testcafeLogoUrl = 'http://localhost:4200/assets/testcafe.png'
const cypressLogoUrl = 'http://localhost:4200/assets/cypress.png'

export default () => (
  <div className="container">
    <h1 className="title">
      Alternatives
    </h1>
    <div className="image-bg">
      <img src={testcafeLogoUrl} alt="" />
      <img src={cypressLogoUrl} alt="" />
    </div>

  </div>
)
