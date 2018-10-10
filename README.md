#### [Demos and Documentation](https://fusioncharts.github.io/react-native-fusioncharts/)

# react-native-fusioncharts

A `React Native` component which provides bindings for `FusionCharts` JavaScript Charting Library. It easily adds rich and interactive charts to any `React Native` Projects.

## Installation

To install `react-native-fusioncharts`, run:

```bash
$ npm install --save react-native-fusioncharts
```

After installing `react-native-fusioncharts`, follow the steps below:

### For Android

- Create `assets` folder in `android/app/src/main` directory if it doesn't exist.
- Copy `FusionCharts` library in the `assets` folder (in most cases copy `node_modules/fusioncharts` folder).
- Create a file named `fusioncharts.html` in this `assets` folder with the required `FusionCharts` module files. Find the sample html file [here](https://github.com/fusioncharts/react-native-fusioncharts/blob/master/templates/fuioncharts-tpl-android.html).
- Set `libraryPath` property to the `FusionCharts` component as follows:

```html
<FusionCharts
  ......
  libraryPath={{ uri: 'file:///android_asset/fusioncharts.html' }}
/>
```

- Add the following script in Application's `package.json` file as follows to bundle your assets when you want to genarate a signed APK:

`package.json` file:

```javascript
  ......

  "scripts": {
    ......
    "clean:build:android": "rm -rf android/app/build",
    "prod:android": "npm run clean:build:android  && react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res"
  },
  ......
```

Now run the following command before genarating the signed APK:

```bash
$ npm run prod:android
```

Click [here](https://facebook.github.io/react-native/docs/signed-apk-android) to find more information

### For iOS

- Create `assets` folder in your project root if it doesn't exist.
- Copy `FusionCharts` library in this `assets` folder (requires only when the licensed version of `FusionCharts` is used).
- Create a file named `fusioncharts-tpl.html` in this `assets` folder with the required `FusionCharts` module files. Find the sample html file [here](https://github.com/fusioncharts/react-native-fusioncharts/blob/master/templates/fuioncharts-tpl-ios.html).
- Add a `build:assets` script in Application's `package.json` file as follows:

`package.json` file:

```javascript
  ......

  "scripts": {
    ......

    "build:assets": "fc-build-assets --fc-template ./assets/fusioncharts-tpl.html --fc-library ./assets/fusioncharts"
  },

  ......
```

The `--fc-library ./assets/fusioncharts` option is only required when you copied `FusionCharts` library in your `assets` folder.

**Notes:** `fc-build-assets` is an utility binary provided to package the `FusionCharts` libraries from the template `.html` file as needed by the React Native iOS build process.

- Set `libraryPath` property to the `FusionCharts` component as follows:

```jsx
<FusionCharts
  ......

  libraryPath={require('./assets/fusioncharts.html')}
 />
```

- Run the following command before running the app:

```bash
$ npm run build:assets
```

## Getting Started

Include the `react-native-fusioncharts` library as follows:

The `App.js` file:

```jsx
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Platform } from 'react-native';
import FusionCharts from 'react-native-fusioncharts';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'column2d',
      width: '100%',
      height: '100%',
      dataFormat: 'json',
      dataSource: {
        chart: {
          caption: "Harry's SuperMart",
          subCaption: 'Top 5 stores in last month by revenue',
          numberprefix: '$',
          theme: 'fint'
        },
        data: [
          { label: 'Bakersfield Central', value: '880000' },
          { label: 'Garden Groove harbour', value: '730000' },
          { label: 'Los Angeles Topanga', value: '590000' },
          { label: 'Compton-Rancho Dom', value: '520000' },
          { label: 'Daly City Serramonte', value: '330000' }
        ]
      }
    };

    this.libraryPath = Platform.select({
      // Specify fusioncharts.html file location
      ios: require('./assets/fusioncharts.html'),
      android: { uri: 'file:///android_asset/fusioncharts.html' }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          FusionCharts Integration with React Native
        </Text>
        <View style={styles.chartContainer}>
          <FusionCharts
            type={this.state.type}
            width={this.state.width}
            height={this.state.height}
            dataFormat={this.state.dataFormat}
            dataSource={this.state.dataSource}
            libraryPath={this.libraryPath} // set the libraryPath property
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

## Listening to Events

In this sample we are attaching dataplotclick event in the chart.

```javascript
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Alert } from 'react-native';
import FusionCharts from 'react-native-fusioncharts';

export default class ListenEvents extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
      },
      events: {
        // Add your events method here:
        // Event name should be in small letters.
        dataplotclick: (e, a) => {
          Alert.alert(`You clicked on ${e.data.categoryLabel}`);
        }
      }
    };
    this.libraryPath = Platform.select({
      // Specify fusioncharts.html file location
      android: { uri: 'file:///android_asset/fusioncharts.html' },
      ios: require('../assets/fusioncharts.html')
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Listen to events from chart</Text>
        <View style={styles.chartContainer}>
          <FusionCharts
            type={this.state.type}
            width={this.state.width}
            height={this.state.height}
            dataFormat={this.state.dataFormat}
            dataSource={this.state.dataSource}
            events={this.state.events}
            libraryPath={this.libraryPath} // set the libraryPath property
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

## Calling chart APIs

In this sample we can change the chart type dynamically using chart APIs.

```javascript
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, Alert } from 'react-native';
import FusionCharts from 'react-native-fusioncharts';

export default class ChartRunTime extends Component {
  constructor(props) {
    super(props);
    // Create a property(e.g: apiCaller) which will get attached to a function
    // where you can pass Chart API methods you want to run.
    this.apiCaller = null;
    this.state = {
      type: 'column2d',
      width: '100%',
      height: '100%',
      dataFormat: 'json',
      chartType: '',
      dataSource: {
        chart: {
          caption: 'Recommended Portfolio Split',
          subCaption: 'For a net-worth of $1M',
          showValues: '1',
          showPercentInTooltip: '0',
          numberPrefix: '$',
          enableMultiSlicing: '1',
          theme: 'fusion'
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
    this.libraryPath = Platform.select({
      // Specify fusioncharts.html file location
      android: { uri: 'file:///android_asset/fusioncharts.html' },
      ios: require('../assets/fusioncharts.html')
    });

    this.bindApiCaller = this.bindApiCaller.bind(this);
    this.changeType = this.changeType.bind(this);
  }

  changeType(type) {
    this.setState({ chartType: type }, () => {
      // Chart instance is available in window.chartObj.
      // Passing js code to run chart api method.
      this.apiCaller(`window.chartObj.chartType('${type}')`); // This method accepts js code in string.
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
          <FusionCharts
            type={this.state.type}
            width={this.state.width}
            height={this.state.height}
            dataFormat={this.state.dataFormat}
            dataSource={this.state.dataSource}
            libraryPath={this.libraryPath} // set the libraryPath property
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

## Unit Test

```sh
$ npm test
```

## Contributing

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

To run release version of Android app, run:

```sh
$ npm run android:release
```

To run release version of iOS app, run:

```sh
$ npm run ios:release
```

To generate a signed release Android APK, run:

```sh
$ npm run build:android
```

To generate release iOS app, run:

```sh
$ npm run build:ios
```

### [Demos and Documentation](https://fusioncharts.github.io/react-native-fusioncharts/)
