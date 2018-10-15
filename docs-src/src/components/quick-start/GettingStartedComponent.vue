<template>
  <div>
    <div class="div-margin">
      Include the
      <span class="highlighted">react-native-fusioncharts</span>&nbsp;library as follows:
    </div>
    <div class="div-margin">
      The
      <span class="highlighted">App.js</span>&nbsp;file
    </div>
    <div class="code-view mt-2">
      <div class="card-shadow">
        <div class="card-body p-0">
          <div class="code-panel">
            <div class="codeMirrorDiv" id="c1">
              <codemirror :value="code" :options="options"></codemirror>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const code = `import React, { Component } from 'react';
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
AppRegistry.registerComponent('ReactNativeFusionCharts', () => App);`;

export default {
  name: 'GettingStartedComponent',
  data() {
    return {
      code: code,
      options: {
        lineNumbers: true,
        theme: 'dracula',
        tabSize: '4',
        smartIndent: true,
        readOnly: true,
        mode: 'javascript'
      }
    };
  }
};
</script>

<style scoped>
.highlighted {
  background-color: #ece8e8;
  padding: 1px;
  padding-left: 4px;
  padding-right: 4px;
  border-radius: 3px;
}

.text-bold {
  font-size: 18px;
  font-weight: bold;
}

.div-margin {
  margin-bottom: 8px;
}
</style>