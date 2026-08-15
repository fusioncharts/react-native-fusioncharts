import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ReactNativeFusionCharts, {
  type ChartConfig,
} from 'react-native-fusioncharts';

const chartConfig: ChartConfig = {
  type: 'column2d',
  width: '100%',
  height: 360,
  dataFormat: 'json',
  dataSource: {
    chart: {
      caption: 'Compatibility smoke test',
      theme: 'fusion',
      exportEnabled: '1',
    },
    data: [
      {label: 'Current', value: '42'},
      {label: 'Previous', value: '35'},
    ],
  },
};

export default function App() {
  return (
    <View style={styles.container}>
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
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
});
