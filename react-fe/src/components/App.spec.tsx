import * as React from 'react';
import { shallow } from 'enzyme';

import App from './App';

describe('App', function () {
  it('should render without throwing an error', function () {
    const component = shallow(<App />);

    expect(component.find('Toggle')).toHaveLength(1);
  });

});