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

* Create `assets` folder in `android/app/src/main` directory if it doesn't exist.
* Copy `FusionCharts` library in the `assets` folder (in most cases copy `node_modules/fusioncharts` folder).
* Create a file named `fuioncharts.html` in this `assets` folder with the required `FusionCharts` module files. Find the sample html file [here](https://github.com/fusioncharts/react-native-fusioncharts/blob/master/templates/fuioncharts-tpl-android.html).
* Set `libraryPath` property to the `FusionCharts` component as follows:

```html
<FusionCharts
  ......

  libraryPath={{ uri: 'file:///android_asset/fusioncharts.html' }}
 />
```

### For iOS

* Create `assets` folder in your project root if it doesn't exist.
* Copy `FusionCharts` library in this `assets` folder (requires only when the licensed version of `FusionCharts` is used).
* Create a file named `fuioncharts-tpl.html` in this `assets` folder with the required `FusionCharts` module files. Find the sample html file [here](https://github.com/fusioncharts/react-native-fusioncharts/blob/master/templates/fuioncharts-tpl-ios.html).
* Add a `build:assets` script in Application's `package.json` file as follows:

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

* Set `libraryPath` property to the `FusionCharts` component as follows:

```html
<FusionCharts
  ......

  libraryPath={require('./assets/fusioncharts.html')}
 />
```

* Run the following command before running the app:

```bash
$ npm run build:assets
```

## Getting Started

Include the `react-native-fusioncharts` library as follows:

The `App.js` file:

```javascript
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
            "chart": {
                "caption": "Harry's SuperMart",
                "subCaption": "Top 5 stores in last month by revenue",
                "numberprefix": "$",
                "theme": "fint"
            },
            "data": [
                {
                    "label": "Bakersfield Central",
                    "value": "880000"
                },
                {
                    "label": "Garden Groove harbour",
                    "value": "730000"
                },
                {
                    "label": "Los Angeles Topanga",
                    "value": "590000"
                },
                {
                    "label": "Compton-Rancho Dom",
                    "value": "520000"
                },
                {
                    "label": "Daly City Serramonte",
                    "value": "330000"
                }
            ]
        }
    };

    this.libraryPath = Platform.select({
      // Specify fusioncharts.html file location
      ios: require('./assets/fusioncharts.html'),
      android: { uri: 'file:///android_asset/fusioncharts.html' },
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

## Unit Test

```sh
$ npm test
```

## Contributing

* Clone the repository.
* Install dependencies
* Run `npm start` to start React Native Packager server.
* Run on Android or iOS emulator.

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
