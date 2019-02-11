import React, { Component } from 'react';
import { View, WebView, StyleSheet } from 'react-native';
import * as utils from './utils/utils';
import fusonChartsOptions from './utils/options';

export default class ReactNativeFusionCharts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataJson: null,
      schemaJson: null
    };

    this.webViewLoaded = false;
    this.onWebViewLoad = this.onWebViewLoad.bind(this);
    this.onWebViewMessage = this.onWebViewMessage.bind(this);
    this.oldOptions = null;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataJson && nextProps.dataJson !== this.props.dataJson) {
      this.setState({ dataJson: nextProps.dataJson });
    }
    if (
      nextProps.schemaJson &&
      nextProps.schemaJson !== this.props.schemaJson
    ) {
      this.setState({ schemaJson: nextProps.schemaJson });
    }
    if (!this.oldOptions) {
      return;
    }
    this.detectChanges(nextProps);
  }

  onWebViewLoad() {
    this.webViewLoaded = true;
    this.renderChart();
  }

  onWebViewMessage(e) {
    this.webView.postMessage(e.nativeEvent.data);

    let msgData;
    try {
      msgData = JSON.parse(e.nativeEvent.data);
    } catch (err) {
      return;
    }

    const response = this[msgData.targetFunc].apply(this, [msgData.data]);
    msgData.isSuccessfull = true;
    msgData.args = [response];
    this.webView.postMessage(JSON.stringify(msgData));
  }

  detectChanges(nextProps) {
    const currentOptions = this.resolveChartOptions(nextProps);
    const { oldOptions } = this;
    const optionsUpdatedNatively = [
      'type',
      'dataFormat',
      'dataSource',
      'events'
    ];

    // this.checkAndUpdateTimeSeries(currentOptions, oldOptions);
    this.checkAndUpdateChartType(currentOptions, oldOptions);
    this.checkAndUpdateChartData(currentOptions, oldOptions);
    this.checkAndUpdateEvents(currentOptions, oldOptions);
    this.checkAndUpdateRestOptions(
      fusonChartsOptions.filter(
        option => optionsUpdatedNatively.indexOf(option) === -1
      ),
      currentOptions,
      oldOptions
    );

    this.oldOptions = currentOptions;
  }

  checkAndUpdateTimeSeries(currentOptions, oldOptions) {
    console.log(currentOptions);
    console.log(oldOptions);
  }

  checkAndUpdateChartType(currentOptions, oldOptions) {
    const currType = currentOptions.type;
    const oldType = oldOptions.type;

    if (String(currType).toLowerCase() !== String(oldType).toLowerCase()) {
      if (!utils.isUndefined(currType)) {
        this.runInWebView(`
          window.chartObj.chartType('${String(currType).toLowerCase()}');
        `);
      }
    }
  }

  checkAndUpdateChartData(currentOptions, oldOptions) {
    const currDataFormat = currentOptions.dataFormat;
    const currData = currentOptions.dataSource;
    const oldDataFormat = oldOptions.dataFormat;
    const oldData = oldOptions.dataSource;

    if (
      String(currDataFormat).toLowerCase() !==
      String(oldDataFormat).toLowerCase()
    ) {
      if (!utils.isUndefined(currDataFormat) && !utils.isUndefined(currData)) {
        this.runInWebView(`
          window.chartObj.setChartData(${utils.portValueSafely(
            currData
          )}, '${String(currDataFormat).toLowerCase()}');
          window.chartObj.render();
        `);
      }
    } else if (!this.isSameChartData(currData, oldData)) {
      if (!utils.isUndefined(currData)) {
        this.runInWebView(`
          window.chartObj.setChartData(
            ${utils.portValueSafely(currData)},
            '${currDataFormat ? String(currDataFormat).toLowerCase() : 'json'}'
          );
        `);
      }
    }
  }

  isSameChartData(currData, oldData) {
    if (
      utils.checkIfDataTableExists(currData) &&
      !utils.checkIfDataTableExists(oldData)
    ) {
      return false;
    }
    // 2. Old has and Current doesn't
    if (
      !utils.checkIfDataTableExists(currData) &&
      utils.checkIfDataTableExists(oldData)
    ) {
      return false;
    }
    // 3. Both has, check ref is equal, return false only if not equal
    if (
      utils.checkIfDataTableExists(currData) &&
      utils.checkIfDataTableExists(oldData) &&
      currData.data !== oldData.data
    ) {
      return false;
    }
    if (
      utils.checkIfDataTableExists(currData) &&
      utils.checkIfDataTableExists(oldData) &&
      currData.data === oldData.data
    ) {
      // 4. Clone oldData for diff
      const oldDataStringified = JSON.stringify(
        utils.cloneDataSource(oldData, 'diff')
      );
      // 5. Clone currentData for diff
      const currentDataStringified = JSON.stringify(
        utils.cloneDataSource(currData, 'diff')
      );
      // 6. return string check.
      return oldDataStringified === currentDataStringified;
    }
    if (utils.isObject(currData) && utils.isObject(oldData)) {
      return utils.isSameObjectContent(currData, oldData);
    }
    return currData === oldData;
  }

  checkAndUpdateEvents(currentOptions, oldOptions) {
    const currEvents = currentOptions.events;
    const oldEvents = oldOptions.events;

    const currEventNames = currEvents ? Object.keys(currEvents) : [];
    const oldEventNames = oldEvents ? Object.keys(oldEvents) : [];
    currEventNames.forEach(eventName => {
      if (oldEventNames.indexOf(eventName) === -1) {
        this.runInWebView(`
          window.chartObj.addEventListener('${eventName}', function(eventObj, dataObj) {
            window.webViewBridge.send('handleChartEvents', {
               eventName: '${eventName}',
               eventObj: {
                 eventType: eventObj.eventType,
                 eventId: eventObj.eventId,
                 cancelled: eventObj.cancelled,
                 prevented: eventObj.prevented,
                 detach: eventObj.detach,
                 data: eventObj.data
               },
               dataObj: dataObj
            });
          });
        `);
      }
    });
  }

  checkAndUpdateRestOptions(restOptions, currentOptions, oldOptions) {
    let optionsUpdated = false;
    restOptions.forEach(optionName => {
      const currValue = currentOptions[optionName];
      const oldValue = oldOptions[optionName];

      if (!this.isSameOptionValue(currValue, oldValue)) {
        if (!utils.isUndefined(currValue)) {
          optionsUpdated = true;
          this.runInWebView(`
            if (window.chartObj.options && window.chartObj.options.hasOwnProperty('${optionName}')) {
              window.chartObj.options['${optionName}'] = ${utils.portValueSafely(
            currValue
          )};
            }
          `);
        }
      }
    });

    if (optionsUpdated) {
      this.runInWebView(`
        window.chartObj.render();
      `);
    }
  }

  isSameOptionValue(currValue, oldValue) {
    if (utils.isObject(currValue) && utils.isObject(oldValue)) {
      return utils.isSameObjectContent(currValue, oldValue);
    }
    return String(currValue) === String(oldValue);
  }

  renderChart() {
    // var dataTable = new FusionCharts.DataStore().createDataTable(
    //   ${utils.portValueSafely(this.state.dataJson)},
    //   ${utils.portValueSafely(this.state.schemaJson)}
    // );
    // chartConfigs.dataSource.data = dataTable;
    // let clonedDataSource = {};
    const chartOptions = this.resolveChartOptions(this.props);
    utils.PortTimeSeriesValueSafely(chartOptions);
    if (this.props.type === 'timeseries') {
      // clonedDataSource = utils.cloneDataSource(chartOptions.dataSource);
      chartOptions.dataSource.data = null;
      const script = `
      var chartConfigs = ${utils.portValueSafely(chartOptions)};
      chartConfigs.width = '100%';
      chartConfigs.height = '100%';
      chartConfigs.renderAt = 'chart-container';
      chartConfigs.events = ${this.wrapEvents(chartOptions.events)};
      var dataTable = new FusionCharts.DataStore().createDataTable(
        ${utils.portValueSafely(this.state.dataJson)},
        ${utils.portValueSafely(this.state.schemaJson)}
      );
      chartConfigs.dataSource.data = dataTable;
      window.chartObj = new FusionCharts(chartConfigs);
      window.chartObj.render();
    `;
      this.runInWebView(script);
      this.oldOptions = chartOptions;
    } else {
      const script = `
      var chartConfigs = ${utils.portValueSafely(chartOptions)};
      chartConfigs.width = '100%';
      chartConfigs.height = '100%';
      chartConfigs.renderAt = 'chart-container';
      chartConfigs.events = ${this.wrapEvents(chartOptions.events)};
      window.chartObj = new FusionCharts(chartConfigs);
      window.chartObj.render();
    `;
      this.runInWebView(script);
      this.oldOptions = chartOptions;
    }
  }

  resolveChartOptions(props) {
    const chartConfig = props.chartConfig ? props.chartConfig : {};
    const inlineOptions = fusonChartsOptions.reduce((options, optionName) => {
      options[optionName] = props[optionName];
      return options;
    }, {});
    Object.assign(inlineOptions, chartConfig);

    if (
      utils.isObject(inlineOptions.dataSource) &&
      utils.checkIfDataTableExists(inlineOptions.dataSource)
    ) {
      console.log('DataTable exists');
      inlineOptions.dataSource = utils.cloneDataSource(
        inlineOptions.dataSource,
        'clone'
      );
    } else if (
      utils.isObject(inlineOptions.dataSource) &&
      !utils.checkIfDataTableExists(inlineOptions.dataSource)
    ) {
      inlineOptions.dataSource = utils.deepCopyOf(inlineOptions.dataSource);
    }
    if (utils.isObject(inlineOptions.link)) {
      inlineOptions.link = utils.deepCopyOf(inlineOptions.link);
    }
    if (utils.isObject(inlineOptions.events)) {
      inlineOptions.events = Object.assign({}, inlineOptions.events);
    }
    return inlineOptions;
  }

  runInWebView(script) {
    if (this.webViewLoaded) {
      this.webView.injectJavaScript(`
        (function() { ${script} })();
      `);
    }
  }

  resolveChartStyles() {
    const dimenStyles = {};
    if (this.props.width) {
      dimenStyles.width = utils.convertToNumber(this.props.width);
    }
    if (this.props.height) {
      dimenStyles.height = utils.convertToNumber(this.props.height);
    }
    return [this.props.style, dimenStyles];
  }

  handleChartEvents(data) {
    if (this.props.events && this.props.events[data.eventName]) {
      this.props.events[data.eventName].call(
        this,
        Object.assign(utils.deepCopyOf(data.eventObj), { sender: this }),
        utils.deepCopyOf(data.dataObj)
      );
    }
  }

  wrapEvents(events = {}) {
    let eventsMap = Object.keys(events).map(
      eventName => `'${eventName}': function(eventObj, dataObj) {
        window.webViewBridge.send('handleChartEvents', {
          eventName: '${eventName}',
          eventObj: {
            eventType: eventObj.eventType,
            eventId: eventObj.eventId,
            cancelled: eventObj.cancelled,
            prevented: eventObj.prevented,
            detach: eventObj.detach,
            data: eventObj.data
          },
          dataObj: dataObj
        });
      }`
    );

    eventsMap.push(`'rendercomplete': function(eventObj, dataObj){
      window.webViewBridge.send('chartRendered', {
        eventName: 'chartrendered' 
      });
    }`);
    eventsMap = eventsMap.join(',');
    return `{ ${eventsMap} }`;
  }

  chartRendered() {
    if (this.props.onInitialized) {
      this.props.onInitialized(this.runInWebView.bind(this));
    }
  }

  render() {
    return (
      <View style={this.resolveChartStyles()}>
        <WebView
          originWhitelist={['*']}
          useWebkit
          style={styles.webview}
          ref={webView => {
            this.webView = webView;
          }}
          source={this.props.libraryPath}
          onLoad={this.onWebViewLoad}
          onMessage={this.onWebViewMessage}
          javaScriptEnabled
          domStorageEnabled
          scalesPageToFit
          mixedContentMode="compatibility"
          scrollEnabled={false}
          automaticallyAdjustContentInsets
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
    backgroundColor: 'transparent'
  }
});