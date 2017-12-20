import 'react-native';
import React from 'react';
import FusionCharts from '../src/FusionCharts';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

jest.mock('WebView', () => 'WebView');

test('renders correctly', () => {
  const tree = renderer.create(
    <FusionCharts
      width={400}
      height={200}
      type={'column2d'}
      dataFormat={'json'}
      dataSource={require('../assets/data.json')}
    />).toJSON();
  expect(tree).toMatchSnapshot();
});