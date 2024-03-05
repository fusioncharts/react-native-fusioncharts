import React, { Component } from "react";
import { View, StyleSheet, Platform, PermissionsAndroid } from "react-native";
import { WebView } from "react-native-webview";
import FileSystem from 'react-native-fs';
import notifee, { AndroidImportance } from '@notifee/react-native';
import Share from 'react-native-share';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import * as utils from "./utils/utils";
import fusonChartsOptions from "./utils/options";
import layout from "./modules/layout";
import scripts from "./modules/scripts";
import modules from "./modules/modules";

export default class ReactNativeFusionCharts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: props.type || "",
      dataJson: props.dataJson,
      schemaJson: props.schemaJson,
      modules: props.modules || [],
      licenseConfig: global.licenseConfig || {},
    };

    this.webViewLoaded = false;
    this.oldOptions = null;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      (nextProps.dataJson && nextProps.dataJson !== prevState.dataJson) ||
      (nextProps.schemaJson && nextProps.schemaJson !== prevState.schemaJson)
    ) {
      return { dataJson: nextProps.dataJson, schemaJson: nextProps.schemaJson };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.dataJson !== this.state.dataJson) {
      this.updateTimeSeriesChart(this.props, true);
    }
    if (prevState.schemaJson !== this.state.schemaJson) {
      this.updateTimeSeriesChart(this.props, true);
    }
    if (!this.oldOptions) {
      return;
    }
    this.detectChanges(this.props);
  }

  onWebViewLoad = () => {
    this.webViewLoaded = true;
    this.renderChart();
  };

  onWebViewMessage = async (e) => {
    let msgData, data;
    try {
      msgData = JSON.parse(e.nativeEvent.data);
      data = msgData.data;
    } catch (err) {
      return;
    }
    if (msgData.targetFunc) {
      this[msgData.targetFunc].apply(this, [data]);
    }
    if (data.eventName === "download") {
      this.exportData(data);
    }
  };

  getCheckPermissionPromise = () => {
    if (Platform.Version >= 33) {
      return Promise.all([
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES),
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO),
      ]).then(
        ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
          hasReadMediaImagesPermission && hasReadMediaVideoPermission,
      );
    } else {
      return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
    }
  };

  getRequestPermissionPromise = () => {
    if (Platform.Version >= 33) {
      return PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
      ]).then(
        (statuses) =>
          statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
          PermissionsAndroid.RESULTS.GRANTED &&
          statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
          PermissionsAndroid.RESULTS.GRANTED,
      );
    } else {
      return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then((status) => status === PermissionsAndroid.RESULTS.GRANTED);
    }
  };

  hasAndroidPermission = async () => {
    const hasPermission = await this.getCheckPermissionPromise();
    if (hasPermission) {
      return true;
    }
    return await this.getRequestPermissionPromise();
  }

  savePicture = async (uri) => {
    try {
      if (Platform.OS === "android" && !(await this.hasAndroidPermission())) {
        console.log("No permission");
        return;
      }
      CameraRoll.saveAsset(uri)
      console.log("Photo saved successfully.");
    } catch (error) {
      console.log("error while saving" + error);
    }

  };

  // Method to request permission (iOS only)
  async requestUserPermission() {
    const settings = await notifee.requestPermission();
    if (settings.authorizationStatus !== 1) {
      console.warn('Notification permissions not granted.');
    }
  }

  // Method to create a notification channel (Android only)
  async createNotificationChannel() {
    // For Android, create a notification channel with custom sound
    await notifee.createChannel({
      id: 'download',
      name: 'Download Notifications',
      sound: 'email-sound.wav', // Custom sound (needs to be placed in the correct Android directory)
      importance: AndroidImportance.HIGH, // High importance for pop-up notifications
    });
  }

  // Method to schedule a notification
  async scheduleNotification(data, fileUri) {
    await this.createNotificationChannel(); // Ensure the channel is created

    // Schedule a local notification
    await notifee.displayNotification({
      title: data.name,
      body: 'Download complete',
      android: {
        channelId: 'download', // Reference the created channel
        sound: 'email-sound.wav', // Custom sound
      },
      data: {
        fileUri: fileUri, // Attach any additional data you want
      },
    });
  }

  exportData = async (data) => {
    let extension, base64Code;
    try {
      const fileUri = `file://${FileSystem.DocumentDirectoryPath}/${data.name}`;
      extension = data.name.substr(data.name.indexOf(".") + 1);
      switch (extension) {
        case "jpg": {
          base64Code = data.edata.split("data:image/jpeg;base64,")[1];
          break;
        }
        case "png": {
          base64Code = data.edata.split("data:image/png;base64,")[1];
          break;
        }
        case "svg": {
          base64Code = data.edata.split("data:image/svg+xml;base64,")[1];
          break;
        }
        case "pdf": {
          base64Code = data.edata.split("data:application/pdf;base64,")[1];
          break;
        }
        case "csv": {
          if (Platform.OS === "ios") {
            base64Code = data.edata.split("data:text/csv;base64,")[1];
          } else {
            base64Code = data.edata.split("data:text/csv;base64;;base64,")[1];
          }
          break;
        }
        case "xlsx": {
          base64Code = data.edata.split(
            "data:application/vnd.ms-excel;base64,"
          )[1];
          break;
        }
      }
      await FileSystem.writeFile(fileUri, base64Code, 'base64')
      await Share.open({ url: fileUri, name: data.name });
      await this.savePicture(fileUri);
      await this.requestNotificationPermission();
      await this.scheduleNotification(data, fileUri);
    } catch (error) {
      console.log("Error while exporting data :" + error);
    }
  };

  detectChanges(nextProps) {
    const currentOptions = this.resolveChartOptions(nextProps);
    const { oldOptions } = this;
    const optionsUpdatedNatively = [
      "type",
      "dataFormat",
      "dataSource",
      "events",
    ];

    this.checkAndUpdateChartType(currentOptions, oldOptions);
    this.checkAndUpdateChartData(currentOptions, oldOptions);
    this.checkAndUpdateEvents(currentOptions, oldOptions);
    this.checkAndUpdateRestOptions(
      fusonChartsOptions.filter(
        (option) => optionsUpdatedNatively.indexOf(option) === -1
      ),
      currentOptions,
      oldOptions
    );

    this.oldOptions = currentOptions;
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
      currentOptions.type === "timeseries" &&
      !utils.isUndefined(currData) &&
      !this.isSameChartData(currData, oldData)
    ) {
      this.updateTimeSeriesChart(currentOptions, false);
      return;
    }

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
            '${currDataFormat ? String(currDataFormat).toLowerCase() : "json"}'
          );
        `);
      }
    }
  }

  updateTimeSeriesChart(chartConfigs, isJsonChanged) {
    if (this.state.schemaJson && this.state.dataJson) {
      const script = `
      var chartConfigs = ${utils.portValueSafely(chartConfigs)};
      if(window.dataTable && ${!isJsonChanged}) {
        chartConfigs.dataSource.data = window.dataTable;
      } else if(${isJsonChanged}) {
        if(${utils.portValueSafely(
        this.state.dataJson
      )} && ${utils.portValueSafely(this.state.schemaJson)}) {
          var dataTable = new FusionCharts.DataStore().createDataTable(
            ${utils.portValueSafely(this.state.dataJson)},
            ${utils.portValueSafely(this.state.schemaJson)}
          );
          chartConfigs.dataSource.data = dataTable;
          if(chartConfigs && chartConfigs.dataSource && chartConfigs.dataSource.data) {
            window.dataTable = chartConfigs.dataSource.data;
          }
        }
      }
      window.chartObj.setChartData(chartConfigs.dataSource, 'json');
    `;
      this.runInWebView(script);
    }
  }

  isSameChartData(currData, oldData) {
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
    currEventNames.forEach((eventName) => {
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
    restOptions.forEach((optionName) => {
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
    const chartOptions = this.resolveChartOptions(this.props);
    let script;
    if (this.state.type === "timeseries") {
      script = `
      var chartConfigs = ${utils.portValueSafely(chartOptions)};
      chartConfigs.width = '100%';
      chartConfigs.height = '100%';
      chartConfigs.renderAt = 'chart-container';
      chartConfigs.events = ${this.wrapEvents(chartOptions.events)};
      if(${utils.portValueSafely(
        this.state.dataJson
      )} && ${utils.portValueSafely(this.state.schemaJson)}) {
        var dataSource = new FusionCharts.DataStore(); 
        var dataTable = dataSource.createDataTable(
          ${utils.portValueSafely(this.state.dataJson)},
          ${utils.portValueSafely(this.state.schemaJson)}
        );
        chartConfigs.dataSource.data = dataTable;
        if(chartConfigs && chartConfigs.dataSource && chartConfigs.dataSource.data) {
          window.dataSource = dataSource;
          window.dataTable = chartConfigs.dataSource.data;
        }
      }
      window.chartObj = new FusionCharts(chartConfigs);
      window.chartObj.render();
      FusionCharts.options.license(${JSON.stringify(this.state.licenseConfig)});
    `;
    } else {
      script = `
      var chartConfigs = ${utils.portValueSafely(chartOptions)};
      chartConfigs.width = '100%';
      chartConfigs.height = '100%';
      chartConfigs.renderAt = 'chart-container';
      chartConfigs.events = ${this.wrapEvents(chartOptions.events)};
      window.chartObj = new FusionCharts(chartConfigs);
      window.chartObj.render();
      FusionCharts.options.license(${JSON.stringify(this.state.licenseConfig)});
    `;
    }
    this.runInWebView(script);
    this.oldOptions = chartOptions;
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
      inlineOptions.dataSource = utils.cloneDataSource(
        inlineOptions.dataSource,
        "clone"
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

  runInWebView = (script) => {
    if (this.webViewLoaded) {
      this.webView.injectJavaScript(`
        (function() { ${script} })();
      `);
    }
  };

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
      (eventName) => `'${eventName}': function(eventObj, dataObj) {
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

    eventsMap.push(`'initialized': function(eventObj, dataObj){
      window.webViewBridge.send('chartRendered', {
        eventName: 'chartrendered'
      });
    }`);
    eventsMap = eventsMap.join(",");
    return `{ ${eventsMap} }`;
  }

  dataTableOperation = (funcName, ...args) => {
    const argsStr = args.length && JSON.stringify(args);
    const script = `
      if(window.dataTable) {
        var dataTable = window.dataTable;
        var res;
        if(${args.length}) {
          res = dataTable.${funcName}.apply(dataTable, ${argsStr});
        } else {
          res = dataTable.${funcName}();
        }
        window.postMessage(JSON.stringify(res));
        window.dataTable = dataTable;
      }
    `;
    this.runInWebView(script);
  };

  dataStoreOperation = (funcName, ...args) => {
    const script = `
      if(window.dataSource) {
        var dataSource = window.dataSource;
        var res;
        if(${args.length}) {
          res = dataSource.${funcName}.apply(dataSource, ${args});
        } else {
          res = dataSource.${funcName}();
        }
        window.postMessage(JSON.stringify(res));
        window.dataSource = dataSource;
      }
    `;
    this.runInWebView(script);
  };

  runFcApiInWebView = (script) => {
    if (this.webViewLoaded) {
      this.webView.injectJavaScript(`
      (function() { window.chartObj.${script} })();
      `);
    }
  };

  chartRendered() {
    if (this.props.onInitialized) {
      this.props.onInitialized(this.runFcApiInWebView);
    }
    if (this.props.onDataTableInitialized) {
      this.props.onDataTableInitialized(this.dataTableOperation);
    }
    if (this.props.onDataStoreInitialized) {
      this.props.onDataStoreInitialized(this.dataStoreOperation);
    }
  }

  getInjectJs() {

    // Add modules into Scripts object, specified with props.modules
    const scriptWithModules = Object.keys(modules)
      .filter(key => this.state.modules.includes(key))
      .reduce((filterdModules, key) => {
        filterdModules[key] = modules[key];
        return filterdModules;
      }, scripts);

    const runFirst = `
    var modulesList = ${JSON.stringify(this.state.modules)};
    var readable = ${JSON.stringify(scriptWithModules)};
      function loadScripts(file, callback) {
          var fcScript = document.createElement('script');
          fcScript.innerHTML = readable[file]
          document.body.appendChild(fcScript);

          if (callback) {
              callback.call();
          }
      }
      
      loadScripts('fusioncharts', function () {
        loadScripts('fusioncharts.charts', function () {
          loadScripts('fusioncharts.theme.fusion', function () {
            loadScripts('fusioncharts.excelexport', function () {
              if (modulesList.length > 0) {
                for (var i = 0; i < modulesList.length; i++) {
                  loadScripts(modulesList[i], undefined);
                }
              }
            });
          });
        });
    }, false);
  `;
    return runFirst;
  }

  render() {
    return (
      <View style={this.resolveChartStyles()}>
        <WebView
          originWhitelist={["*"]}
          useWebkit
          style={styles.webview}
          ref={(webView) => {
            this.webView = webView;
          }}
          source={{
            html: layout,
          }}
          injectedJavaScript={this.getInjectJs()}
          onLoad={this.onWebViewLoad}
          onMessage={this.onWebViewMessage}
          javaScriptEnabled
          domStorageEnabled
          mixedContentMode="compatibility"
          allowFileAccess
          allowFileAccessFromFileURLs
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
    backgroundColor: "transparent",
  },
});