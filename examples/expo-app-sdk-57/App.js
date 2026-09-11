import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ReactNativeFusionCharts from 'react-native-fusioncharts';

const chartConfig = {
  type: 'column2d',
  width: '100%',
  height: 420,
  dataFormat: 'json',
  dataSource: {
    chart: {
      caption: 'Quarterly revenue',
      subCaption: 'Expo development build',
      xAxisName: 'Quarter',
      yAxisName: 'Revenue',
      numberPrefix: '$',
      theme: 'fusion',
      exportEnabled: '1',
    },
    data: [
      { label: 'Q1', value: '420000' },
      { label: 'Q2', value: '510000' },
      { label: 'Q3', value: '560000' },
      { label: 'Q4', value: '640000' },
    ],
  },
};

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native FusionCharts</Text>
      <ReactNativeFusionCharts chartConfig={chartConfig} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
