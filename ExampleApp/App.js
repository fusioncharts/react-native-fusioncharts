/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { View, StyleSheet, Button } from 'react-native';

import FusionCharts from 'react-native-fusioncharts';

const dataSource = {
  chart: {
    caption: 'Business Results 2005 v 2006',
    xaxisname: 'Month',
    yaxisname: 'Revenue',
    showvalues: '1',
    numberprefix: '$',
    useroundedges: '1',
    animation: '1'
  },
  categories: [
    {
      category: [
        {
          label: 'Jan'
        },
        {
          label: 'Feb'
        },
        {
          label: 'Mar'
        },
        {
          label: 'Apr'
        },
        {
          label: 'May'
        },
        {
          label: 'Jun'
        },
        {
          label: 'Jul'
        },
        {
          label: 'Aug'
        },
        {
          label: 'Sep'
        },
        {
          label: 'Oct'
        },
        {
          label: 'Nov'
        },
        {
          label: 'Dec'
        }
      ]
    }
  ],
  dataset: [
    {
      seriesname: '2006',
      data: [
        {
          value: '21000'
        },
        {
          value: '29800'
        },
        {
          value: '25800'
        },
        {
          value: '26800'
        },
        {
          value: '29600'
        },
        {
          value: '32600'
        },
        {
          value: '31800'
        },
        {
          value: '36700'
        },
        {
          value: '29700'
        },
        {
          value: '31900'
        },
        {
          value: '34800'
        },
        {
          value: '24800'
        }
      ]
    },
    {
      seriesname: '2005',
      data: [
        {
          value: '10000'
        },
        {
          value: '6000'
        },
        {
          value: '12500'
        },
        {
          value: '15000'
        },
        {
          value: '11000'
        },
        {
          value: '9800'
        },
        {
          value: '11800'
        },
        {
          value: '19700'
        },
        {
          value: '21700'
        },
        {
          value: '21900'
        },
        {
          value: '22900'
        },
        {
          value: '20800'
        }
      ]
    }
  ],
  events: {
    drawComplete: function() {
      console.log('drawn');
    }
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'msbar2d',
      width: '100%',
      height: '100%',
      dataFormat: 'json',
      dataSource: dataSource,
      schemaJson: null,
      dataJson: null,
      events: {
        beforeRender: function(e, o) {
          console.log('before render', e, o);
        },
        drawComplete: function(e, o) {
          console.log('drawn', e, o);
        },
        dataPlotClick: function(e, o) {
          console.log('First type of Click', e, o);
        }
      }
    };

    this.libraryPath = Platform.select({
      // Specify fusioncharts.html file location
      ios: require('./assets/fusioncharts.html'),
      android: { uri: 'file:///android_asset/fusioncharts.html' }
    });
  }

  componentDidMount() {
    // this.fetchDataAndSchema();
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
      this.setState({ dataJson: data, schemaJson: schema });
    });
  }

  render() {
    return (
      <View style={styles.body}>
        <FusionCharts
          type={this.state.type}
          width={this.state.width}
          height={this.state.height}
          dataFormat={this.state.dataFormat}
          dataSource={this.state.dataSource}
          events={this.state.events}
          libraryPath={this.libraryPath} // set the libraryPath property
        />
        <Button
          title="Press me"
          onPress={() => {
            this.setState({events: {
              dataPlotClick: function(e, o) {
                console.log('Clicked', e, o);
              }
            }})
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    height: 500
  }
});

export default App;
