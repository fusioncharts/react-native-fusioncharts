/**
 * @format
 */

import 'react-native';
import React from 'react';
import ReactNativeFusionCharts from '../src/FusionCharts.js';
import { data } from '../testData/null_data.js';
import { schema } from '../testData/null_schema.js';

// Note: import explicitly to use the types shipped with jest.
import { it } from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react-native';

jest.mock('react-native-webview', () => {
  const MockWebView = jest.requireActual('react-native').View;

  return {
    __esModule: true,
    WebView: MockWebView,
    default: MockWebView,
  };
});

jest.mock('react-native-fs', () => ({
  default: () => jest.fn() // or any mocked component instead of native view,
}));

jest.mock('@notifee/react-native', () => ({
  default: () => jest.fn() // or any mocked component instead of native view,
}));

jest.mock('react-native-share', () => ({
  default: () => jest.fn() // or any mocked component instead of native view,
}));

jest.mock('@react-native-camera-roll/camera-roll', () => ({
  default: () => jest.fn() // or any mocked component instead of native view,
}));


it('Chart renders without crashing', () => {
  const chartData = [
    { label: "Venezuela", value: "250" },
    { label: "Saudi", value: "260" },
    { label: "Canada", value: "180" },
    { label: "Iran", value: "140" },
    { label: "Russia", value: "115" },
    { label: "UAE", value: "100" },
    { label: "US", value: "30" },
    { label: "China", value: "30" },
  ];
  const chartConfig = {
    type: "column2D",
    width: "300",
    height: "400",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Countries With Most Oil Reserves [2017-18]",
        subCaption: "In MMbbl = One Million barrels",
        xAxisName: "Country",
        yAxisName: "Reserves (MMbbl)",
        numberSuffix: "K",
        theme: "fusion",
        exportEnabled: 1 // to enable the export chart functionality
      },
      data: chartData
    }
  };
  const { toJSON } = render(
    <ReactNativeFusionCharts
      chartConfig={chartConfig}
    />);
  expect(toJSON()).toMatchSnapshot(); // Check if the component renders correctly
});


it('TimeSeries chart renders without crashing', () => {
  let startTime = performance.now();

  const chartConfig = {
    type: 'timeseries',
    width: '100%',
    height: '500',
    dataFormat: 'json',
    dataSource: {
      chart: {},
      data: null,
      caption: {
        text: "Pollution Report of Yatcha Street"
      },
      subcaption: {
        text: "An industrial town"
      },
      yaxis: [{
        plot: [{
          value: "Pollution",
          "connectnulldata": "true",
          type: 'line'

        }],
        title: "Pollution Concentration (in ppm)",
        min: "130",

        referenceline: [{
          label: "Controlled Temperature",
          value: "150"
        }]
      }]
    },
    schemaJson: schema,
    dataJson: data
  };

  const events = {
    dataplotclick: (e, a) => {
      alert(`You clicked on ${e.data.categoryLabel}`);
    },
    "rendered": (e, a) => {
      let endTime = performance.now()

      console.log(`Call to doSomething took ${endTime - startTime} milliseconds.`);
    },
    "referencelineclick": function (ev) {
      alert('reference line clicked')
    },
  }
  const modules = ['timeseries'];


  const { toJSON } = render(
    <ReactNativeFusionCharts
      chartConfig={chartConfig}
      events={events}
      modules={modules}
    />);
  expect(toJSON()).toMatchSnapshot(); // Check if the component renders correctly
});
