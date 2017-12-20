#### [Demos and Documentation](https://fusioncharts.github.io/react-native-fusioncharts/)

# react-native-fusioncharts

A react-native component which provides bindings for FusionCharts JavaScript Charting Library. It easily adds rich and interactive charts to any React Native Projects.

## Installation

To install `react-native-fusioncharts`, run:

```bash
$ npm install --save react-native-fusioncharts 
```

## Getting Started

After installing `react-native-fusioncharts`, import it as follows:

```javascipt
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
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
```

## Contributing

* Clone the repository.
* Install dependencies
* Run `npm start` to start React Native packager server.
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

To generate Android signed APK, run:
```sh
$ npm run build:android
```

To generate iOS app, run:
```sh
$ npm run build:ios
```

### [Demos and Documentation](https://fusioncharts.github.io/react-native-fusioncharts/)