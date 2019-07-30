<template>
  <div>
    <div class="div-margin">
      From
      <span class="code">fusioncharts@3.13.3-sr.1</span> and
      <span class="code">react-native-fusioncharts@3.0.0</span>, You can visualize timeseries data easily on react.
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
const code = `// In App.js
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Platform } from 'react-native';
import FusionCharts from 'react-native-fusioncharts';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
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

    this.libraryPath = Platform.select({
      // Specify fusioncharts.html file location
      ios: require('./assets/fusioncharts.html'),
      android: { uri: 'file:///android_asset/fusioncharts.html' }
    });
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
      console.log(data);
      console.log(schema);
      this.setState({ dataJson: data, schemaJson: schema });
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
            dataJson={this.state.dataJson}
            schemaJson={this.state.schemaJson}
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
    height: 500
  }
});`;

export default {
  name: "TimeSeriesSupport",
  data() {
    return {
      code: code,
      options: {
        lineNumbers: true,
        theme: "dracula",
        tabSize: "4",
        smartIndent: true,
        readOnly: true,
        mode: "javascript"
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

.code {
  font-size: 87.5%;
  color: #dd5ec7;
  word-break: break-word;
}
</style>
