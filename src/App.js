import React, { Component } from 'react';
import DataStore from 'fusioncharts/datastore';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Platform,
  ScrollView
} from 'react-native';
import ReactNativeFusionCharts from './FusionCharts';

const jsonify = res => res.json();
// This is the remote url to fetch the data.
const dataFetch = fetch(
  'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/line-chart-with-time-axis-data.json'
).then(jsonify);
// This is the remote url to fetch the schema.
const schemaFetch = fetch(
  'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/line-chart-with-time-axis-schema.json'
).then(jsonify);

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
          caption: "Harry's ss",
          subCaption: 'Top 5 stores in last month by revenue',
          numberPrefix: '$',
          theme: 'ocean'
        },
        data: [
          {
            label: 'Bakersfield Central',
            value: '880000'
          },
          {
            label: 'Garden Groove harbour',
            value: '730000'
          },
          {
            label: 'Los Angeles Topanga',
            value: '590000'
          },
          {
            label: 'Compton-Rancho Dom',
            value: '520000'
          },
          {
            label: 'Daly City Serramonte',
            value: '330000'
          }
        ]
      },
      containerBackgroundColor: 'transparent',
      displayValue: '',
      schemaJson: null,
      dataJson: null,
      timeseriesDs: {
        type: 'timeseries',
        width: '100%',
        height: '100%',
        dataFormat: 'json',
        dataSource: {
          // Initially data is set as null
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
        }
      }
    };

    this.libraryPath = Platform.select({
      ios: require('../assets/fusioncharts.html'),
      android: { uri: 'file:///android_asset/fusioncharts.html' }
    });

    this.fc = Platform;

    this.onPress = this.onPress.bind(this);
    this.events = {
      dataPlotClick: (eventObj, dataObj) => {
        this.setState({
          displayValue: dataObj.displayValue
        });
      }
    };
  }

  // We are creating the DataTable immidietly after the component is mounted
  componentDidMount() {
    this.fetchDataAndSchema();
  }

  onPress() {
    console.log('clicked');
    this.setState({
      dataFormat: 'xml',
      dataSource: `<chart caption="Top 100 Most Popular Sports in the World"
        subcaption="Based on number of viewers" yaxisname="Number of Viewers" plotgradientcolor=""
        bgcolor="FFFFFF" showplotborder="0" divlinecolor="CCCCCC" showvalues="1" showcanvasborder="0"
        canvasbordercolor="CCCCCC" canvasborderthickness="1" showyaxisvalues="0" showlegend="1"
        showshadow="0" labelsepchar=": " basefontcolor="000000" labeldisplay="AUTO"
        numberscalevalue="1000,1000,1000" numberscaleunit="K,M,B"
        palettecolors="#008ee4,#9b59b6,#6baa01,#e44a00,#f8bd19,#d35400,#bdc3c7,#95a5a6,#34495e,#1abc9c"
        showborder="0"  rotateValues="0" placevaluesInside="0" valueFontColor="#909090" theme="fint">
        <set label="Football" value="3500000000" tooltext="Popular in: {br}Europe{br}Africa{br}Asia{br}Americas" />
        <set label="Cricket" value="4400000000" tooltext="Popular in: {br}India{br}UK{br}Pakistan{br}Australia" />
        <set label="Field Hockey" value="2200000000" tooltext="Popular in: {br}Asia{br}Europe{br}Africa{br}Australia" />
        <set label="Tennis" value="1000000000" color="e44a00" tooltext="Popular in: {br}Europe{br}Americas{br}Asia" />
        <set label="Volleyball" value="900000000" tooltext="Popular in: {br}Asia{br}Europe{br}Americas{br}Australia" />
        <set label="Table Tennis" value="900000000" tooltext="Popular in: {br}Asia{br}Europe{br}Africa{br}Americas" />
        <set label="Baseball" value="500000000" tooltext="Popular in: {br}US{br}Japan{br}Cuba{br}Dominican Republic" />
        <set label="Golf" value="400000000" tooltext="Popular in: {br}US{br}Canada{br}Europe" />
        <set label="Basketball" value="400000000" tooltext="Popular in: {br}US{br}Canada" />
        <set label="American football" value="390000000" tooltext="Popular in:{br}US" />
    </chart>`
    });
    const newTsDs = this.state.timeseriesDs;
    newTsDs.dataSource.caption.text = 'Changed!';
    this.setState({ timeseriesDs: newTsDs });
  }

  fetchDataAndSchema() {
    Promise.all([dataFetch, schemaFetch]).then(res => {
      const data = res[0];
      const schema = res[1];
      const dataTable = new DataStore().createDataTable(data, schema);
      // console.log(dataTable);
      // const timeseriesDs = Object.assign({}, this.state.timeseriesDs);
      // timeseriesDs.dataSource.data = dataTable;
      // console.log(timeseriesDs);
      // this.setState({ timeseriesDs });
      this.setState({ dataJson: data, schemaJson: schema });
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.heading}>
          FusionCharts Integration with React Native
        </Text>
        <View style={styles.chartContainer}>
          <ReactNativeFusionCharts
            type={this.state.type}
            width={this.state.width}
            height={this.state.height}
            dataFormat={this.state.dataFormat}
            dataSource={this.state.dataSource}
            containerBackgroundColor={this.state.containerBackgroundColor}
            events={this.events}
            libraryPath={this.libraryPath}
          />
        </View>
        <View style={styles.chartContainer}>
          <ReactNativeFusionCharts
            dataJson={this.state.dataJson}
            schemaJson={this.state.schemaJson}
            type={this.state.timeseriesDs.type}
            width={this.state.timeseriesDs.width}
            height={this.state.timeseriesDs.height}
            dataFormat={this.state.timeseriesDs.dataFormat}
            dataSource={this.state.timeseriesDs.dataSource}
            libraryPath={this.libraryPath}
          />
        </View>
        <Text style={styles.text}>DisplayValue: {this.state.displayValue}</Text>
        <View style={{ alignItems: 'center' }}>
          <Button
            onPress={this.onPress}
            title="Update Chart Data"
            color="#841577"
            accessibilityLabel="Update the chart data"
          />
        </View>
      </ScrollView>
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
  text: {
    fontSize: 15,
    margin: 13
  },
  chartContainer: {
    height: 350
  }
});
