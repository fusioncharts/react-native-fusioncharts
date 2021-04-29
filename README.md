## Deprecation disclaimer :

This is the oldest version of `React Native wrapper` which was released upto 4.1.2 .The project is no longer actively maintained

## FusionCharts React Native :
A `React Native` component which provides bindings for `FusionCharts` JavaScript Charting Library. It easily adds rich and interactive charts to any `React Native` Projects.

## [Demo](https://fusioncharts.github.io/react-native-fusioncharts)

- Github Repo: [https://github.com/fusioncharts/react-native-fusioncharts](https://github.com/fusioncharts/react-native-fusioncharts)
- Documentation: [https://www.fusioncharts.com/dev/getting-started/react-native/your-first-chart-using-react-native](https://www.fusioncharts.com/dev/getting-started/react-native/your-first-chart-using-react-native)
- Support: [https://www.fusioncharts.com/contact-support](https://www.fusioncharts.com/contact-support)
- FusionCharts
  - Official Website: [https://www.fusioncharts.com/](https://www.fusioncharts.com/)
  - Official NPM Package: [https://www.npmjs.com/package/fusioncharts](https://www.npmjs.com/package/fusioncharts)
- Issues: [https://github.com/fusioncharts/react-native-fusioncharts/issues](https://github.com/fusioncharts/react-native-fusioncharts/issues)

---

## Table of Contents

- [Important Note](#imporatant-note)
- [Getting Started](#getting-started)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Working with chart API](#working-with-apis)
  - [Working with events](#working-with-events)
  - [Working with modules](#working-with-modules)
  - [License configuration](#license-configuration)
- [Quick Start](#quick-start)
- [Going Beyond Charts](#going-beyond-charts)
- [Usage and Integration of FusionTime](#usage-and-integration-of-fusionTime)
- [For Contributors](#for-contributors)
- [Licensing](#licensing)

# Important Note

If you're using this package with Expo Tools, please make sure your Expo SDK version is higher than or equal to `v38.0.0`.

In bare React Native application you need to also install the react-native-unimodules package, and configure the content of ios and android build directiories like it's described [here](https://docs.expo.io/bare/installing-unimodules/#installation).

As the original `webview` module will be deprecated from `react-native`, please update `react-native-fusioncharts` and follow the given steps in your project:

- Run the following command in your project

```bash
$ npm install react-native-webview
```

- After that link this module to your app

```bash
$ react-native link react-native-webview
```

- For iOS, go to your `ios` directory and run the following

```bash
$ pod install
```

## Getting Started

### Requirements

- **Node.js**, **NPM/Yarn** installed globally in your OS.

### Installation

This wrapper can be installed within app based on [Expo tools](https://docs.expo.io/), or bare [React Native](https://reactnative.dev/docs/getting-started) app.

To install `react-native-fusioncharts`, run:

```bash
$ npm install --save react-native-fusioncharts
```

After installing `react-native-fusioncharts`, follow the steps below:

It is required to add the .fcscript into the asset extensions section of metro.config.js file, or create that file within your project, and configure it like below:

```javascript
const {getDefaultConfig} = require('metro-config');

module.exports = (async () => {
  const {
      resolver: { sourceExts, assetExts }
  } = await getDefaultConfig()
  return {
      transformer: {
          getTransformOptions: async () => ({
              transform: {
                  experimentalImportSupport: false,
                  inlineRequires: false
              }
          })
      },
      resolver: {
        sourceExts,
        assetExts: [...assetExts, 'fcscript']
      }
    }
})()
```

## Quick Start

Include the `react-native-fusioncharts` library as follows:

The `App.js` file:

```jsx
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Platform } from 'react-native';
import ReactNativeFusionCharts from 'react-native-fusioncharts';

export default class App extends Component {
  constructor(props) {
    super(props);
    //STEP 2 - Chart Data
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
    //STEP 3 - Chart Configurations
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
          exportEnabled: 1 // to enable the export chart functionality
        },
        data: chartData
      }
    };

    this.state = {
      chartConfig
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          FusionCharts Integration with React Native
        </Text>
        <View style={styles.chartContainer}>
          <ReactNativeFusionCharts
            chartConfig={this.state.chartConfig}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  heading: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10
  },
  chartContainer: {
    height: 200
  }
});

// skip this line if using Create React Native App
AppRegistry.registerComponent('ReactNativeFusionCharts', () => App);
```

## Working with Events

In this sample we are attaching dataplotclick event in the chart.

```javascript
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Alert } from 'react-native';
import ReactNativeFusionCharts from 'react-native-fusioncharts';

export default class ListenEvents extends Component {
  constructor(props) {
    super(props);

    const chartConfig = {
      type: 'column2d',
      width: '100%',
      height: '100%',
      dataFormat: 'json',
      dataSource: {
        chart: {
          caption: 'Countries With Most Oil Reserves [2017-18]',
          subCaption: 'In MMbbl = One Million barrels',
          xAxisName: 'Country',
          yAxisName: 'Reserves (MMbbl)',
          numberSuffix: 'K',
          theme: 'fusion'
        },
        data: [
          { label: 'Venezuela', value: '290' },
          { label: 'Saudi', value: '260' },
          { label: 'Canada', value: '180' },
          { label: 'Iran', value: '140' },
          { label: 'Russia', value: '115' },
          { label: 'UAE', value: '100' },
          { label: 'US', value: '30' },
          { label: 'China', value: '30' }
        ]
      }
    };

    this.state = {
      chartConfig,
      events: {
        // Add your events method here:
        // Event name should be in small letters.
        dataplotclick: (e, a) => {
          Alert.alert(`You clicked on ${e.data.categoryLabel}`);
        }
      }
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Listen to events from chart</Text>
        <View style={styles.chartContainer}>
          <ReactNativeFusionCharts
            chartConfig={this.state.chartConfig}
            events={this.state.events}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  header: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    paddingBottom: 10
  },
  chartContainer: {
    height: 400,
    borderColor: '#000',
    borderWidth: 1
  }
});
```

## Working with APIs

In this sample we can change the chart type dynamically using chart APIs.

```javascript
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, Alert } from 'react-native';
import ReactNativeFusionCharts from 'react-native-fusioncharts';

export default class ChartRunTime extends Component {
  constructor(props) {
    super(props);
    // Create a property(e.g: apiCaller) which will get attached to a function
    // where you can pass Chart API methods you want to run.
    this.apiCaller = null;
    const chartConfig = {
      type: 'column2d',
      width: '100%',
      height: '100%',
      dataFormat: 'json',
      dataSource: {
        chart: {
          caption: 'Recommended Portfolio Split',
          subCaption: 'For a net-worth of $1M',
          showValues: '1',
          showPercentInTooltip: '0',
          numberPrefix: '$',
          enableMultiSlicing: '1',
          theme: 'fusion',
          exportEnabled: 1
        },
        data: [
          {
            label: 'Equity',
            value: '300000'
          },
          {
            label: 'Debt',
            value: '230000'
          },
          {
            label: 'Bullion',
            value: '180000'
          },
          {
            label: 'Real-estate',
            value: '270000'
          },
          {
            label: 'Insurance',
            value: '20000'
          }
        ]
      }
    };

    this.state = {
      chartConfig,
      chartType: ''
    }
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
    if (this.state.chartType === '')
      this.setState({ chartType: this.state.type });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Change chart type at runtime</Text>
        <View style={styles.chartContainer}>
          <ReactNativeFusionCharts
            chartConfig={this.state.chartConfig}
            onInitialized={caller => {
              this.bindApiCaller(caller);
            }}
          />
        </View>
        <Text style={styles.info}>Press button to change chart type</Text>
        <View style={styles.buttonContainer}>
          <Button
            disabled={
              this.state.chartType === '' || this.state.chartType == 'column2d'
            }
            style={{ margin: 8 }}
            title="Column2D"
            onPress={() => this.changeType('column2d')}
          />
          <Button
            disabled={
              this.state.chartType === '' || this.state.chartType == 'pie2d'
            }
            title="Pie2D"
            onPress={() => this.changeType('pie2d')}
          />
          <Button
            disabled={
              this.state.chartType === '' || this.state.chartType == 'bar2d'
            }
            title="Bar2D"
            onPress={() => this.changeType('bar2d')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  header: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    paddingBottom: 10
  },
  chartContainer: {
    height: 400,
    borderColor: '#000',
    borderWidth: 1
  },
  buttonContainer: {
    padding: 10,
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center'
  },
  info: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5
  }
});
```

## Working with modules

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
      dataSource: { // your data goes here
        // for gantt chart data please visit https://www.fusioncharts.com/dev/chart-attributes/gantt
      }
    };  
    this.state = {
      chartConfig
    };
  }
 
  render() {
    const modules = ['gantt']; // module names goes here
    return (
      <View style={styles.container}>
        <View style={styles.chartContainer}>
          <ReactNativeFusionCharts
            chartConfig={this.state.chartConfig}
            modules={modules}
          />
        </View>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
 
  chartContainer: {
    height: '60%',
    borderColor: "#000",
    borderWidth: 1
  }
});
```

In this sample we can add the theme modules dynamically e.g candy, carbon, gammel etc

```javascript
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Alert } from 'react-native';
import ReactNativeFusionCharts from 'react-native-fusioncharts';

export default class ListenEvents extends Component {
  constructor(props) {
    super(props);

    const chartConfig = {
      type: 'column2d',
      width: '100%',
      height: '100%',
      dataFormat: 'json',
      dataSource: {
        chart: {
          caption: 'Countries With Most Oil Reserves [2017-18]',
          subCaption: 'In MMbbl = One Million barrels',
          xAxisName: 'Country',
          yAxisName: 'Reserves (MMbbl)',
          numberSuffix: 'K',
          theme: 'carbon', // your theme name goes here
          exportEnabled: 1
        },
        data: [
          { label: 'Venezuela', value: '290' },
          { label: 'Saudi', value: '260' },
          { label: 'Canada', value: '180' },
          { label: 'Iran', value: '140' },
          { label: 'Russia', value: '115' },
          { label: 'UAE', value: '100' },
          { label: 'US', value: '30' },
          { label: 'China', value: '30' }
        ]
      }
    };

    this.state = {
      chartConfig
    };
  }

  render() {
    const modules = ['carbon']; // theme module name
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Listen to events from chart</Text>
        <View style={styles.chartContainer}>
          <ReactNativeFusionCharts
            chartConfig={this.state.chartConfig}
            modules={modules}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  header: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    paddingBottom: 10
  },
  chartContainer: {
    height: 400,
    borderColor: '#000',
    borderWidth: 1
  }
});
```

## License Configuration

If you are using a licensed verison of fusioncharts and have a valid license key, add the license object by either creating a new file with your license configuration inside it and import it in app.js or add ‘global.licenseConfig’ object to the app.js file as shown below

```javascript
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import ReactNativeFusionCharts from "react-native-fusioncharts";
 
global.licenseConfig = {
  key: "your key goes here",
  creditLabel: false // true/false to show/hide watermark respectively
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
          exportEnabled: 1
        },
        data: [
          { label: "Venezuela", value: "250" },
          { label: "Saudi", value: "260" },
          { label: "Canada", value: "180" },
          { label: "Iran", value: "140" },
          { label: "Russia", value: "115" },
          { label: "UAE", value: "100" },
          { label: "US", value: "30" },
          { label: "China", value: "30" }
        ],
      },
    };
    this.state = {
      chartConfig
    };
}
 
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.chartContainer}>
          <ReactNativeFusionCharts
            chartConfig={this.state.chartConfig}
          />
        </View>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
 
  chartContainer: {
    height: '60%',
    borderColor: "#000",
    borderWidth: 1
  }
});
```

## Usage and integration of FusionTime

From `fusioncharts@3.13.3-sr.1` and `react-native-fusioncharts@3.0.0`, You can visualize timeseries data easily on react.

Learn more about FusionTime [here](https://www.fusioncharts.com/fusiontime).

### Consider the example below for integration of FusionTime

```js
// In App.js
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Platform } from 'react-native';
import ReactNativeFusionCharts from 'react-native-fusioncharts';

export default class App extends Component {
  constructor(props) {
    super(props);

    const chartConfig = {
      type: 'timeseries',
      width: '100%',
      height: '100%',
      dataFormat: 'json',
      dataSource: {
        data: null,
        caption: {
          text: 'Sales Analysis'
        },
        subcaption: {
          text: 'Grocery'
        },
        yAxis: [
          {
            plot: {
              value: 'Grocery Sales Value',
              type: 'line'
            },
            format: {
              prefix: '$'
            },
            title: 'Sale Value'
          }
        ]
      },
      schemaJson: null,
      dataJson: null
    };

    this.state = {
      chartConfig
    }
  }

  componentDidMount() {
    this.fetchDataAndSchema();
  }

  fetchDataAndSchema() {
    const jsonify = res => res.json();
    const dFetch = fetch(
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/line-chart-with-time-axis-data.json'
    ).then(jsonify);
    // This is the remote url to fetch the schema.
    const sFetch = fetch(
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/line-chart-with-time-axis-schema.json'
    ).then(jsonify);
    Promise.all([dFetch, sFetch]).then(res => {
      const data = res[0];
      const schema = res[1];
      const updatedChartConfig = {...this.state.chartConfig, dataJson: data, schemaJson: schema}
      this.setState({ chartConfig: updatedChartConfig });
    });
  }

  render() {
    const modules = ['timeseries'];

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          FusionCharts Integration with React Native
        </Text>
        <View style={styles.chartContainer}>
          <ReactNativeFusionCharts
            chartConfig={this.state.chartConfig}
            modules={modules}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  heading: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10
  },
  chartContainer: {
    height: 500
  }
});
```

## Going Beyond Charts

- Explore 20+ pre-built business specific dashboards for different industries like energy and manufacturing to business functions like sales, marketing and operations [here](https://www.fusioncharts.com/explore/dashboards).
- See [Data Stories](https://www.fusioncharts.com/explore/data-stories) built using FusionCharts’ interactive JavaScript visualizations and learn how to communicate real-world narratives through underlying data to tell compelling stories.

## For Contributors

- Clone the repository.
- Install dependencies
- Run `npm start` to start React Native Packager server.
- Run on Android or iOS emulator.

```sh
$ git clone https://github.com/fusioncharts/react-native-fusioncharts.git
$ cd react-native-fusioncharts
$ npm i
$ npm start
$ emulator @<name_of_android_emulator>
$ npm run android [to run on Android platform]
$ npm run ios [to run on iOS platform]
```

To create a build, run:

```sh
$ npm run build:FC
```

## Licensing

The FusionCharts React Native integration component is open-source and distributed under the terms of the MIT/X11 License. However, you will need to download and include FusionCharts library in your page separately, which has a [separate license](https://www.fusioncharts.com/buy).
