import 'react-native';
import React from 'react';
import App from '../src/App';

//jest.mock('WebView');
//jest.mock('FusionCharts');

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe("App", () => {
  it('should render', () => {
    const wrapper = mount(<App />);
    expect(wrapper).to.be.ok;
  });
});
