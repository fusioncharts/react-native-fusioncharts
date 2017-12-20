import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import FusionCharts from '../src/FusionCharts';

jest.unmock('ScrollView');
jest.mock('../assets/fusioncharts.html', () => {
  const path = require('path');
  const fs = require('fs');

  // Library path respect to project directory
  const fcLibraryPath = path.resolve('./assets/fusioncharts.html');
  return { html: fs.readFileSync(fcLibraryPath, "utf8") }
});

describe("FusionCharts", () => {
  it('should render as expected', () => {
    const tree = renderer.create(
      <FusionCharts
        {...chartOptions}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

const chartOptions = {
  type: 'column2d',
  width: 400,
  height: 300,
  dataFormat: 'json',
  dataSource: require('../assets/data.json'),
  containerBackgroundColor: 'transparent',
  events: {
    dataPlotClick: (eventObj, dataObj) => {
      console.log(dataObj.displayValue);
    }
  }
};