import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Button, Platform } from 'react-native';
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
    };

    this.updateData = this.updateData.bind(this);

    this.libraryPath = Platform.select({
      // Specify fusioncharts.html file location
      ios: require('./assets/fusioncharts.html'),
      android: { uri: 'file:///android_asset/fusioncharts.html' },
    });
  }

  updateData() {
    const prevDs = Object.assign({}, this.state.dataSource);
    prevDs.data[2].label = 'Art Supply Store';
    prevDs.data[2].value = '420000';
    prevDs.data[3].label = 'P.C. Richard & Son';
    prevDs.data[3].value = '210000';
    this.setState({
      dataSource: prevDs
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
        <Button
          onPress={this.updateData}
          title="Change Chart Data"
        />
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
  }
});

// skip this line if using Create React Native App
AppRegistry.registerComponent('ReactNativeFusionCharts', () => App);