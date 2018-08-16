import * as React from 'react'

const testcafeLogoUrl = 'http://www.testingtoolsguide.net/wp-content/uploads/2018/02/testcafe.png'
const cypressLogoUrl = 'https://www.cypress.io/img/logo-dark.36f3e062.png'

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
