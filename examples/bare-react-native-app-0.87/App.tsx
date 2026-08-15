import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import ReactNativeFusionCharts, {
  type ChartConfig,
} from 'react-native-fusioncharts';

const chartConfig: ChartConfig = {
  type: 'column2d',
  width: '100%',
  height: 420,
  dataFormat: 'json',
  dataSource: {
    chart: {
      caption: 'Quarterly revenue',
      subCaption: 'Offline assets; native export enabled',
      xAxisName: 'Quarter',
      yAxisName: 'Revenue',
      numberPrefix: '$',
      theme: 'fusion',
      exportEnabled: '1',
    },
    data: [
      {label: 'Q1', value: '420000'},
      {label: 'Q2', value: '510000'},
      {label: 'Q3', value: '560000'},
      {label: 'Q4', value: '640000'},
    ],
  },
};

function App(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.title}>React Native FusionCharts</Text>
      <ReactNativeFusionCharts chartConfig={chartConfig} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 48,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
  },
});

export default App;
