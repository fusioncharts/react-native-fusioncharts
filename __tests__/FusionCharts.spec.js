import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import FusionCharts from '../src/FusionCharts';
import fusonChartsOptions from '../src/utils/options';
import { deepCopyOf } from '../src/utils/utils';

/* global describe it expect jest */
jest.unmock('ScrollView');

jest.mock('../assets/fusioncharts.html', () => {
  const path = require('path');
  const fs = require('fs');
  // Library path respect to project directory
  const fcLibraryPath = path.resolve('./assets/fusioncharts.html');
  return { html: fs.readFileSync(fcLibraryPath, 'utf8') };
});

jest.mock('WebView', () => {
  const RealComponent = require.requireActual('WebView');
  class WebView extends RealComponent {
    constructor(props) {
      super(props);
      this.injectJavaScript = () => { };
      this.postMessage = () => { };
    }
  }
  return WebView;
});


describe('FusionCharts', () => {
  it('should render as expected', () => {
    const tree = renderer.create(<FusionCharts
      {...chartOptions}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render the chart when webview is loaded', () => {
    const instance = renderer.create(<FusionCharts
      {...chartOptions}
    />).getInstance();

    expect(instance.oldOptions).toBeNull();
    expect(instance.webViewLoaded).toBe(false);

    instance.onWebViewLoad();
    expect(instance.oldOptions).not.toBeNull();
    expect(instance.webViewLoaded).toBe(true);
  });

  it('should handle the data sent from WebView context', () => {
    const instance = renderer.create(<FusionCharts
      {...chartOptions}
    />).getInstance();

    instance.onMessageHandler = jest.fn();
    const mockedData = { a: 1, b: 2 };
    const mockedEventObj = {
      nativeEvent: {
        data: JSON.stringify({
          targetFunc: 'onMessageHandler',
          data: mockedData,
          msgId: Math.floor(Math.random() * 10000),
        }),
      },
    };
    instance.onWebViewMessage(mockedEventObj);
    expect(instance.onMessageHandler).toHaveBeenCalledWith(mockedData);

    instance.onMessageHandler = jest.fn();
    instance.onWebViewMessage({ nativeEvent: { data: 'invalid_json' } });
    expect(instance.onMessageHandler).not.toHaveBeenCalled();
  });

  it('should resolve the chart options passed through properties', () => {
    let mockedChartOptions = Object.assign({}, chartOptions, {
      chartConfig: { containerBackgroundColor: 'transparent' },
      events: { dataPlotClick: () => { } },
      link: {},
    });
    let instance = renderer.create(<FusionCharts
      {...mockedChartOptions}
    />).getInstance();

    let resolvedChartOptions = instance.resolveChartOptions(instance.props);
    let expected = {
      ...fusonChartsOptions.reduce((options, optionName) => (options[optionName] = undefined, options), {}),
      ...{ type: chartOptions.type, dataFormat: chartOptions.dataFormat, dataSource: deepCopyOf(chartOptions.dataSource) },
      events: Object.assign({}, mockedChartOptions.events),
      link: Object.assign({}, mockedChartOptions.link),
      ...mockedChartOptions.chartConfig,
    };
    expect(resolvedChartOptions).toEqual(expected);

    mockedChartOptions = Object.assign({}, chartOptions, { dataSource: undefined });
    instance = renderer.create(<FusionCharts
      {...mockedChartOptions}
    />).getInstance();

    resolvedChartOptions = instance.resolveChartOptions(instance.props);
    expected = {
      ...fusonChartsOptions.reduce((options, optionName) => (options[optionName] = undefined, options), {}),
      ...{ type: chartOptions.type, dataFormat: chartOptions.dataFormat },
    };
    expect(resolvedChartOptions).toEqual(expected);
  });

  it('should not run script in webview context until the webview is loaded', () => {
    const instance = renderer.create(<FusionCharts
      {...chartOptions}
    />).getInstance();

    const mockedScript = 'console.log(\'Hello from react native context\')';

    instance.webView.injectJavaScript = jest.fn();
    instance.runInWebView(mockedScript);
    expect(instance.webView.injectJavaScript).not.toHaveBeenCalled();

    instance.webView.injectJavaScript = jest.fn();
    instance.onWebViewLoad();
    instance.runInWebView(mockedScript);
    expect(instance.webView.injectJavaScript).toHaveBeenCalled();
  });

  it('should handle chart dimensions if width and height are not specified', () => {
    const mockedChartOptions = Object.assign({}, chartOptions, { width: undefined, height: undefined });
    const instance = renderer.create(<FusionCharts
      {...mockedChartOptions}
    />).getInstance();

    expect(instance.resolveChartStyles()).toEqual([undefined, {}]);
  });

  it('should handle chart events emitted from webview', () => {
    const mockedData = {
      eventName: 'dataPlotClick',
      eventObj: { eventType: 'dataPlotClick' },
      dataObj: { pageX: 111, pageY: 222 },
    };
    let mockedEventListener = jest.fn();
    let mockedChartOptions = Object.assign({}, chartOptions, {
      events: { dataPlotClick: mockedEventListener },
    });
    let instance = renderer.create(<FusionCharts
      {...mockedChartOptions}
    />).getInstance();

    instance.handleChartEvents(mockedData);
    expect(mockedEventListener).toHaveBeenCalled();

    mockedEventListener = jest.fn();
    mockedChartOptions = Object.assign({}, chartOptions, {
      events: {},
    });
    instance = renderer.create(<FusionCharts
      {...mockedChartOptions}
    />).getInstance();

    instance.handleChartEvents(mockedData);
    expect(mockedEventListener).not.toHaveBeenCalled();

    mockedEventListener = jest.fn();
    instance = renderer.create(<FusionCharts
      {...chartOptions}
    />).getInstance();

    instance.handleChartEvents(mockedData);
    expect(mockedEventListener).not.toHaveBeenCalled();
  });

  it('should wrap the chart event listeners', () => {
    let mockedChartOptions = Object.assign({}, chartOptions, {
      events: {
        event1() { },
        event2() { },
      },
    });
    let instance = renderer.create(<FusionCharts
      {...mockedChartOptions}
    />).getInstance();

    let wrappedListeners = instance.wrapEvents(instance.props.events);
    expect(wrappedListeners).toMatch(/event1/g);
    expect(wrappedListeners).toMatch(/event2/g);

    mockedChartOptions = Object.assign({}, chartOptions);
    instance = renderer.create(<FusionCharts
      {...mockedChartOptions}
    />).getInstance();

    wrappedListeners = instance.wrapEvents(instance.props.events);
    expect(wrappedListeners).toMatch(/^\{\s{0,}\}$/);
  });

  it('should not respond on component property changes until the webview is loaded', () => {
    const instance = renderer.create(<FusionCharts
      {...chartOptions}
    />).getInstance();

    changeComponentProps(instance, { type: 'pie2d' });
    expect(instance.oldOptions).toBeNull();

    instance.onWebViewLoad();
    expect(instance.oldOptions).not.toBeNull();
    expect(instance.oldOptions.type).toBe('pie2d');

    changeComponentProps(instance, { type: 'pie3d' });
    expect(instance.oldOptions.type).toBe('pie3d');
  });

  it('should update the chart when chart type property changes', () => {
    const instance = renderer.create(<FusionCharts
      {...chartOptions}
    />).getInstance();
    instance.onWebViewLoad();

    changeComponentProps(instance, { type: 'pie2d' });
    expect(instance.oldOptions.type).toBe('pie2d');

    changeComponentProps(instance, { type: 'pie2d' });
    expect(instance.oldOptions.type).toBe('pie2d');

    changeComponentProps(instance, { type: undefined });
    expect(instance.oldOptions.type).toBeUndefined();
  });

  it('should update the chart when chart data changes', () => {
    const instance = renderer.create(<FusionCharts
      {...chartOptions}
    />).getInstance();
    instance.onWebViewLoad();

    changeComponentProps(instance, { dataFormat: 'jsonurl', dataSource: 'data.json' });
    expect(instance.oldOptions.dataFormat).toBe('jsonurl');
    expect(instance.oldOptions.dataSource).toBe('data.json');

    changeComponentProps(instance, { dataFormat: undefined });
    expect(instance.oldOptions.dataFormat).toBeUndefined();
    expect(instance.oldOptions.dataSource).toEqual('data.json');

    changeComponentProps(instance, { dataSource: 'data2.json' });
    expect(instance.oldOptions.dataFormat).toBeUndefined();
    expect(instance.oldOptions.dataSource).toBe('data2.json');

    changeComponentProps(instance, { dataFormat: 'json', dataSource: require('../assets/data.json') });
    expect(instance.oldOptions.dataFormat).toBe('json');
    expect(instance.oldOptions.dataSource).toEqual(require('../assets/data.json'));

    const newData = require('../assets/data.json');
    newData.chart.caption = 'New caption';
    changeComponentProps(instance, { dataSource: newData });
    expect(instance.oldOptions.dataFormat).toBe('json');
    expect(instance.oldOptions.dataSource).toEqual(newData);

    changeComponentProps(instance, {});
    expect(instance.oldOptions.dataFormat).toBe('json');
    expect(instance.oldOptions.dataSource).toEqual(newData);

    changeComponentProps(instance, { dataSource: undefined });
    expect(instance.oldOptions.dataFormat).toBe('json');
    expect(instance.oldOptions.dataSource).toBeUndefined();
  });

  it('should update the chart when chart event changes', () => {
    const mockedChartOptions = Object.assign({}, chartOptions, {
      events: {
        event1() { },
        event2() { },
      },
    });
    const instance = renderer.create(<FusionCharts
      {...mockedChartOptions}
    />).getInstance();
    instance.onWebViewLoad();

    changeComponentProps(instance, { events: { event1: () => { }, event2: () => { }, event3: () => { } } });
    expect(Object.keys(instance.oldOptions.events).sort()).toEqual(['event1', 'event2', 'event3'].sort());

    changeComponentProps(instance, { events: undefined });
    expect(instance.oldOptions.events).toBeUndefined();

    changeComponentProps(instance, { events: undefined });
    expect(instance.oldOptions.events).toBeUndefined();
  });

  it('should update the chart when other chart configurations change', () => {
    const mockedChartOptions = Object.assign({}, chartOptions, {
      containerBackgroundColor: 'transparent',
      link: {},
    });
    const instance = renderer.create(<FusionCharts
      {...mockedChartOptions}
    />).getInstance();
    instance.onWebViewLoad();

    changeComponentProps(instance, { containerBackgroundColor: '#000000' });
    expect(instance.oldOptions.containerBackgroundColor).toBe('#000000');
    expect(instance.oldOptions.link).toEqual({});

    changeComponentProps(instance, { link: { link1: 'mocked_value' } });
    expect(instance.oldOptions.containerBackgroundColor).toBe('#000000');
    expect(instance.oldOptions.link).toEqual({ link1: 'mocked_value' });

    changeComponentProps(instance, { containerBackgroundColor: undefined });
    expect(instance.oldOptions.containerBackgroundColor).toBeUndefined();
    expect(instance.oldOptions.link).toEqual({ link1: 'mocked_value' });
  });
});

const chartOptions = {
  type: 'column2d',
  width: 400,
  height: 300,
  dataFormat: 'json',
  dataSource: require('../assets/data.json'),
};

function changeComponentProps(component, changes) {
  const mockedChangedProps = Object.assign({}, component.props, changes);
  component.componentWillReceiveProps(mockedChangedProps);
  component.props = mockedChangedProps;
}
