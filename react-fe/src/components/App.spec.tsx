import * as React from 'react'
import { shallow } from 'enzyme'

import App from './App'

describe('App', () => {
  it('should render without throwing an error', () => {
    const component = shallow(<App />)

    expect(component.find('Toggle')).toHaveLength(1)
  })
})
