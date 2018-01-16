import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Text, Platform } from 'react-native';
import FusionCharts from 'react-native-fusioncharts';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'column2d',
      width: '100%',
      height: '100%',
      dataFormat: 'json',
      dataSource: {/* see data tab */ },
      actualValue: ''
    };

    this.events = {
      dataplotRollOver: (eventObj, dataObj) => {
        this.setState({
          actualValue: dataObj.dataValue
        });
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
        <View style={styles.chartContainer}>
          <FusionCharts
            type={this.state.type}
            width={this.state.width}
            height={this.state.height}
            dataFormat={this.state.dataFormat}
            dataSource={this.state.dataSource}
            events={this.events}
            libraryPath={this.libraryPath}
          />
        </View>
        <Text style={styles.text}>
          Actual Value: {this.state.actualValue}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  },
  chartContainer: {
    flex: 1
  },
  text: {
    marginTop: 15
  }
});

// skip this line if using Create React Native App
AppRegistry.registerComponent('ReactNativeFusionCharts', () => App);