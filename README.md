<p align="center">
<img src="https://cdn.fusioncharts.com/fusioncharts/assets/fusioncharts-logo.svg" width="234px" alt="FusionCharts - Build beautiful web & mobile dashboards">
</p>

## React Native FusionCharts

Welcome to the official GitHub repository for the React Native FusionCharts component! This component provides seamless bindings for the FusionCharts JavaScript Charting Library, allowing you to effortlessly integrate rich and interactive charts into your React Native projects.

Enhance your applications with our diverse range of charts designed to meet all your data visualization needs. Get started today and bring your data to life!

## Table of Contents

Here's the updated GitHub documentation with rephrased section headings and modified slugs:

- [Important Links](#important-links)
- [Introduction](#introduction)
- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Requirements](#requirements)
  - [Installation](#installation)
- [Developing Applications with FusionCharts and Expo](#developing-applications-with-fusioncharts-and-expo)
- [Creating an App with FusionCharts using React Native CLI](#creating-an-app-with-fusioncharts-using-react-native-cli)
- [Quick Start](#quick-start)
  - [Event Handling](#event-handling)
  - [API Integration](#api-integration)
  - [Module Management](#module-management)
  - [Setting Up Licenses](#setting-up-licenses)
  - [FusionTime Integration](#fusiontime-integration)
    - [Example Integration](#example-integration)
- [Going Beyond Charts](#going-beyond-charts)
- [Contributor Guidelines](#contributor-guidelines)
- [License Information](#license-information)

## Important Links

- [Github Repo](https://github.com/fusioncharts/react-native-fusioncharts)
- [Documentation](https://www.fusioncharts.com/dev/getting-started/react-native/your-first-chart-using-react-native)
- [FusionCharts Website](https://www.fusioncharts.com/)
- [FusionCharts NPM Package](https://www.npmjs.com/package/fusioncharts)
- [Support](https://www.fusioncharts.com/contact-support)
- [Issues](https://github.com/fusioncharts/react-native-fusioncharts/issues)

## Introduction

React Native FusionCharts version 6.0.0 is compatible with the following versions of Expo and React Native. While it is possible that version 6.0.0 may function with newer versions of React Native and Expo, it has only been tested up to React Native 74.5.

| Expo SDK Versions   | React Native Versions |
| ------------------- | --------------------- |
| 47, 48, 49, 50 & 51 | >=0.70.8 & <=0.74.5   |

## Overview

To quickly integrate React Native FusionCharts, follow these essential steps. This process installs all required dependencies, allowing those already familiar with FusionCharts to get up and running quickly. If you are new to FusionCharts, referring the [Getting Started](#getting-started) section will be more helpful.

1. **Initial Dependencies Installation**: Begin by running the following command in your project directory to install the necessary dependencies:

   ```
   npm i react-native-webview @notifee/react-native @react-native-camera-roll/camera-roll react-native-fs react-native-share
   ```

2. **Installing React Native FusionCharts**: Next, install the `react-native-fusioncharts` package:

   ```
   npm install react-native-fusioncharts
   ```

3. **iOS Setup**: For iOS applications, navigate to your `ios` directory and execute:

   ```
   pod install
   ```

4. **Enabling Chart Export Functionality on iOS**: To add export functionality for your charts in iOS, modify your `info.plist` file by adding the following code to request photo library access:

   ```swift
   <key>NSPhotoLibraryUsageDescription</key>
   <string>Photo Library Access for downloading the chart</string>
   ```

Now that you have all essential components integrated into your project. You can now check the the [quick start](#quick-start) guide to render a chart or explore the APIs.

## Getting Started

### Requirements

**Node.js**, **NPM/Yarn** installed globally in your OS.

### Installation

React Native FusionCharts can be integrated into applications using [Expo tools](https://docs.expo.io/) or bare [React Native](https://reactnative.dev/docs/getting-started) environments.

## Developing Applications with FusionCharts and Expo

1. Make sure you have Node.js and Git installed in your environment. Check the official [Expo’s documentation](https://docs.expo.dev/get-started/installation/) for more details.

2. Run the following command in terminal to create a new application and navigate in the project directory. You can check [here](https://docs.expo.dev/tutorial/create-your-first-app/) for more details on creating an new expo app.

```
npx create-expo-app FusionApp --template blank && cd FusionApp
```

3. Install React Native FusionCharts:

```
npm i react-native-fusioncharts
```

4. Install dependencies for React Native FusionCharts:

```
npm i react-native-webview @notifee/react-native @react-native-camera-roll/camera-roll react-native-fs react-native-share
```

5. Replace the code in the "App.js" file and replace it with the example [here](#quick-start)

6. Run the `npx expo start` in the project directory and expo should generate a QR-code that you can scan from your iOS camera app to open Expo Go or directly from the Expo Go app in an android device. Make sure your device and system is on the same network.

7. If everything went well so far then you should be able to see FusionCharts sample column2D chart on the app.

## Creating an App with FusionCharts using React Native CLI

This guide is for building an app from scratch using React Native without any framework. If you already have an existing app, then please check the [overview](#overview) section and [examples](#quick-start) to setup FusionCharts.

The initial steps(1-5) to setup the React Native app is taken from the official React Native [guide](https://reactnative.dev/docs/getting-started-without-a-framework) to setup a new app. Please refer to the React Native documentation in case you encounter an issue setting up your app.

1. If you previously installed a global react-native-cli package, please remove it as it may cause unexpected issues:

```
npm uninstall -g react-native-cli @react-native-community/cli
```

2. Use React Native Community CLI to generate a new project.

```
npx @react-native-community/cli@latest init FusionApp && cd FusionApp
```

3. Install React Native FusionCharts:

```
npm i react-native-fusioncharts
```

4. Install dependencies for React Native FusionCharts:

```
npm i react-native-webview @notifee/react-native @react-native-camera-roll/camera-roll react-native-fs react-native-share
```

5. Start Metro (Metro is the JavaScript build tool for React Native. To start the Metro development server, run the following from your project folder)

```
npm start
```

6. Start your application. Let Metro Bundler run in its own terminal. Open a new terminal inside your React Native project folder. Run the following:

```bash
npm run android
# or
npm run ios
```

5. If everything is set up correctly, you should see your new app running in your Android/iOS emulator shortly.

6. A new application named 'FusionApp' has been created. Open App.tsx in your text editor of choice and add chart samples from the [quick start](#quick-start) section. You can find more chart samples in our official [documentation](https://www.fusioncharts.com/dev/getting-started/react-native/your-first-chart-using-react-native)

## Quick Start

Include the `react-native-fusioncharts` library as follows:

The `App.js` file:

```jsx
import React from "react";
import { Text, View } from "react-native";
import ReactNativeFusionCharts from "react-native-fusioncharts";

const Chart = () => {
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
        exportEnabled: 1, // to enable the export chart functionality
      },
      data: chartData,
    },
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
      }}
    >
      <Text>Fusioncharts</Text>
      <ReactNativeFusionCharts chartConfig={chartConfig} />
    </View>
  );
};
export default Chart;
```

## Event Handling

In this sample we are attaching dataplotclick event in the chart.

```javascript
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Alert } from "react-native";
import ReactNativeFusionCharts from "react-native-fusioncharts";

export default function App() {
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
        exportEnabled: 1, // to enable the export chart functionality
      },
      data: chartData,
    },
  };
  const events = {
    // Add your events method here:
    // Event name should be in small letters.
    dataplotclick: (e, a) => {
      Alert.alert(`You clicked on ${e.data.categoryLabel}`);
    },
  };
  return (
    <View style={styles.container}>
      <Text>Fusioncharts</Text>
      <ReactNativeFusionCharts chartConfig={chartConfig} events={events} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
});
```

## API Integration

In this sample we can change the chart type dynamically using chart APIs.

```javascript
import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Button, Alert } from "react-native";
import ReactNativeFusionCharts from "react-native-fusioncharts";

export default class ChartRunTime extends Component {
  constructor(props) {
    super(props);
    // Create a property(e.g: apiCaller) which will get attached to a function
    // where you can pass Chart API methods you want to run.
    this.apiCaller = null;
    const chartConfig = {
      type: "column2d",
      width: "100%",
      height: "100%",
      dataFormat: "json",
      dataSource: {
        chart: {
          caption: "Recommended Portfolio Split",
          subCaption: "For a net-worth of $1M",
          showValues: "1",
          showPercentInTooltip: "0",
          numberPrefix: "$",
          enableMultiSlicing: "1",
          theme: "fusion",
          exportEnabled: 1,
        },
        data: [
          {
            label: "Equity",
            value: "300000",
          },
          {
            label: "Debt",
            value: "230000",
          },
          {
            label: "Bullion",
            value: "180000",
          },
          {
            label: "Real-estate",
            value: "270000",
          },
          {
            label: "Insurance",
            value: "20000",
          },
        ],
      },
    };

    this.state = {
      chartConfig,
      chartType: "",
    };
  }

  changeType(type) {
    this.setState({ chartType: type }, () => {
      // Chart instance is available here.
      // Passing js code to run chart api method.
      this.apiCaller(`chartType('${type}')`); // This method accepts js code in string.
    });
  }

  // Bind the argument from onInitialized with the property you created in your constructor
  bindApiCaller(caller) {
    // Now this.apiCaller will be a function where you can pass js code for the WebView
    // to access the chart Object. See the method changeType.
    this.apiCaller = caller;
    if (this.state.chartType === "") this.setState({ chartType: this.state.type });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Change chart type at runtime</Text>
        <View style={styles.chartContainer}>
          <ReactNativeFusionCharts
            chartConfig={this.state.chartConfig}
            onInitialized={(caller) => {
              this.bindApiCaller(caller);
            }}
          />
        </View>
        <Text style={styles.info}>Press button to change chart type</Text>
        <View style={styles.buttonContainer}>
          <Button
            disabled={this.state.chartType === "" || this.state.chartType == "column2d"}
            style={{ margin: 8 }}
            title="Column2D"
            onPress={() => this.changeType("column2d")}
          />
          <Button
            disabled={this.state.chartType === "" || this.state.chartType == "pie2d"}
            title="Pie2D"
            onPress={() => this.changeType("pie2d")}
          />
          <Button
            disabled={this.state.chartType === "" || this.state.chartType == "bar2d"}
            title="Bar2D"
            onPress={() => this.changeType("bar2d")}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    paddingBottom: 10,
  },
  chartContainer: {
    height: 400,
    borderColor: "#000",
    borderWidth: 1,
  },
  buttonContainer: {
    padding: 10,
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
  },
  info: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 5,
  },
});
```

## Module Management

In this sample we can add the modules dynamically e.g gantt, timeseries, powercharts etc

```javascript
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import ReactNativeFusionCharts from "react-native-fusioncharts";

export default class App extends Component {
  constructor(props) {
    super(props);

    const chartConfig = {
      type: "gantt", // your chart type goes here
      width: "100%",
      height: "400",
      dataFormat: "json",
      dataSource: {
        // your data goes here
        // for gantt chart data please visit https://www.fusioncharts.com/dev/chart-attributes/gantt
      },
    };
    this.state = {
      chartConfig,
    };
  }

  render() {
    const modules = ["gantt"]; // module names goes here
    return (
      <View style={styles.container}>
        <View style={styles.chartContainer}>
          <ReactNativeFusionCharts chartConfig={this.state.chartConfig} modules={modules} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  chartContainer: {
    height: "60%",
    borderColor: "#000",
    borderWidth: 1,
  },
});
```

In this sample we can add the theme modules dynamically e.g candy, carbon, gammel etc

```javascript
import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Alert } from "react-native";
import ReactNativeFusionCharts from "react-native-fusioncharts";

export default class ListenEvents extends Component {
  constructor(props) {
    super(props);

    const chartConfig = {
      type: "column2d",
      width: "100%",
      height: "100%",
      dataFormat: "json",
      dataSource: {
        chart: {
          caption: "Countries With Most Oil Reserves [2017-18]",
          subCaption: "In MMbbl = One Million barrels",
          xAxisName: "Country",
          yAxisName: "Reserves (MMbbl)",
          numberSuffix: "K",
          theme: "carbon", // your theme name goes here
          exportEnabled: 1,
        },
        data: [
          { label: "Venezuela", value: "290" },
          { label: "Saudi", value: "260" },
          { label: "Canada", value: "180" },
          { label: "Iran", value: "140" },
          { label: "Russia", value: "115" },
          { label: "UAE", value: "100" },
          { label: "US", value: "30" },
          { label: "China", value: "30" },
        ],
      },
    };

    this.state = {
      chartConfig,
    };
  }

  render() {
    const modules = ["carbon"]; // theme module name
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Listen to events from chart</Text>
        <View style={styles.chartContainer}>
          <ReactNativeFusionCharts chartConfig={this.state.chartConfig} modules={modules} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    paddingBottom: 10,
  },
  chartContainer: {
    height: 400,
    borderColor: "#000",
    borderWidth: 1,
  },
});
```

## Setting Up Licenses

If you are using a licensed verison of fusioncharts and have a valid license key, add the license object by either creating a new file with your license configuration inside it and import it in app.js or add ‘global.licenseConfig’ object to the app.js file as shown below

```javascript
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import ReactNativeFusionCharts from "react-native-fusioncharts";

global.licenseConfig = {
  key: "your key goes here",
  creditLabel: false, // true/false to show/hide watermark respectively
};
export default class App extends Component {
  constructor(props) {
    super(props);

    const chartConfig = {
      type: "column2D",
      width: "100%",
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
          exportEnabled: 1,
        },
        data: [
          { label: "Venezuela", value: "250" },
          { label: "Saudi", value: "260" },
          { label: "Canada", value: "180" },
          { label: "Iran", value: "140" },
          { label: "Russia", value: "115" },
          { label: "UAE", value: "100" },
          { label: "US", value: "30" },
          { label: "China", value: "30" },
        ],
      },
    };
    this.state = {
      chartConfig,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.chartContainer}>
          <ReactNativeFusionCharts chartConfig={this.state.chartConfig} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  chartContainer: {
    height: "60%",
    borderColor: "#000",
    borderWidth: 1,
  },
});
```

## FusionTime Integration

From `fusioncharts@3.13.3-sr.1` and `react-native-fusioncharts@3.0.0`, You can visualize timeseries data easily on react.

Learn more about FusionTime [here](https://www.fusioncharts.com/fusiontime).

### Example Integration

```js
// In App.js
import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View, Platform } from "react-native";
import ReactNativeFusionCharts from "react-native-fusioncharts";

export default class App extends Component {
  constructor(props) {
    super(props);

    const chartConfig = {
      type: "timeseries",
      width: "100%",
      height: "100%",
      dataFormat: "json",
      dataSource: {
        data: null,
        caption: {
          text: "Sales Analysis",
        },
        subcaption: {
          text: "Grocery",
        },
        yAxis: [
          {
            plot: {
              value: "Grocery Sales Value",
              type: "line",
            },
            format: {
              prefix: "$",
            },
            title: "Sale Value",
          },
        ],
      },
      schemaJson: null,
      dataJson: null,
    };

    this.state = {
      chartConfig,
    };
  }

  componentDidMount() {
    this.fetchDataAndSchema();
  }

  fetchDataAndSchema() {
    const jsonify = (res) => res.json();
    const dFetch = fetch(
      "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/line-chart-with-time-axis-data.json"
    ).then(jsonify);
    // This is the remote url to fetch the schema.
    const sFetch = fetch(
      "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/line-chart-with-time-axis-schema.json"
    ).then(jsonify);
    Promise.all([dFetch, sFetch]).then((res) => {
      const data = res[0];
      const schema = res[1];
      const updatedChartConfig = { ...this.state.chartConfig, dataJson: data, schemaJson: schema };
      this.setState({ chartConfig: updatedChartConfig });
    });
  }

  render() {
    const modules = ["timeseries"];

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>FusionCharts Integration with React Native</Text>
        <View style={styles.chartContainer}>
          <ReactNativeFusionCharts chartConfig={this.state.chartConfig} modules={modules} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  heading: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
  },
  chartContainer: {
    height: 500,
  },
});
```

## Going Beyond Charts

- Explore 20+ pre-built business specific dashboards for different industries like energy and manufacturing to business functions like sales, marketing and operations [here](https://www.fusioncharts.com/explore/dashboards).
- See [Data Stories](https://www.fusioncharts.com/explore/data-stories) built using FusionCharts’ interactive JavaScript visualizations and learn how to communicate real-world narratives through underlying data to tell compelling stories.

## Contributor Guidelines

```sh
#  Clone repo
git clone git@github.com:fusioncharts/react-native-fusioncharts.git
cd react-native-fusioncharts

# Install dependencies
npm install

# Run
npm run start

# Build
npm run build

# Publish
npm publish
```

## License Information

The FusionCharts React Native integration component is open-source and distributed under the terms of the MIT/X11 License. However, you will need to download and include FusionCharts library in your page separately, which has a [separate license](https://www.fusioncharts.com/buy).
