import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Picker, Platform } from 'react-native';
import FusionCharts from 'react-native-fusioncharts';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'column2d',
      width: '100%',
      height: '100%',
      dataFormat: 'json',
      dataSource: {/* see data tab */ }
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
            libraryPath={this.libraryPath}
          />
        </View>
        <Picker
          style={styles.pickerStyle}
          selectedValue={this.state.type}
          onValueChange={(itemValue, itemIndex) => this.setState({ type: itemValue })}>
          <Picker.Item label="Bar 2D Chart" value="bar2d" />
          <Picker.Item label="Line 2D Chart" value="line" />
          <Picker.Item label="Column 2D Chart" value="column2d" />
        </Picker>
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
  pickerStyle: {
    marginTop: 10
  }
});

// skip this line if using Create React Native App
AppRegistry.registerComponent('ReactNativeFusionCharts', () => App);