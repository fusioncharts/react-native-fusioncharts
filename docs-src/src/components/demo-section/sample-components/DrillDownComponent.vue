<template>
  <div>
    <div class="card shadow">
      <div class="card-body chart-wrapper">
        <div class="chart-wrapper-inner">
          <fusioncharts :options="options" :dataSource="dataSource" ref="fc"></fusioncharts>
        </div>
      </div>
    </div>
    <div class="code-view mt-2">
      <div class="card-shadow" style="background: #03040B;">
        <div class="code-nav-btns btn-group" role="group" aria-label="Basic example">
          <button
            v-for="(panel,i) in panels"
            :class="`btn btn-code ${selectedPanel===i?'selected':''}`"
            :key="`btnpanel-${i}`"
            @click="()=>selectTab(i)"
          >{{ panel.type }}</button>
        </div>
        <div
          v-for="(panel,i) in panels"
          :class="`card-body p-0`"
          :key="`btnpanel-${i}`"
          :style="`display: ${selectedPanel===i?'block':'none'}`"
        >
          <div v-if="selectedPanel===i" class="code-panel">
            <codemirror :code="panel.code" :options="codeOptions"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sampleCode from '../../../assets/samples.js';

const jsonData = `{
    "chart": {
        "caption": "Sales of top 3 juice flavors last year",
        "subcaption": "Click on a column to see details",
        "xaxisname": "Flavor",
        "yaxisname": "Amount (In USD)",
        "numberprefix": "$",
        "theme": "fusion",
        "rotateValues": "0"
    },
    "data": [
        {
            "label": "Apple",
            "value": "810000",
            "link": "newchart-xml-apple"
        },
        {
            "label": "Cranberry",
            "value": "620000",
            "link": "newchart-xml-cranberry"
        },
        {
            "label": "Grape",
            "value": "350000",
            "link": "newchart-xml-grape"
        }],
        "linkeddata": [
            {
                "id": "apple",
                "linkedchart": {
                "chart": {
                    "caption": "Apple Juice - Quarterly Sales",
                    "subcaption": "Last year",
                    "numberprefix": "$",
                    "theme": "fusion",
                    "rotateValues": "0",
                    "plottooltext": "$label, $dataValue,  $percentValue"
                },
                "data": [{
                    "label": "Q1",
                    "value": "157000",
                    "displayValue": "Q1, $157K"
                }, {
                    "label": "Q2",
                    "value": "172000",
                    "displayValue": "Q2, $172K"
                }, {
                    "label": "Q3",
                    "value": "206000",
                    "displayValue": "Q3, $206K"
                }, {
                    "label": "Q4",
                    "value": "275000",
                    "displayValue": "Q4, $275K"
                }]
                }
            },
            {
                "id": "cranberry",
                "linkedchart": {
                "chart": {
                    "caption": "Cranberry Juice - Quarterly Sales",
                    "subcaption": "Last year",
                    "numberprefix": "$",
                    "theme": "fusion",
                    "plottooltext": "$label, $dataValue,  $percentValue"
                },
                "data": [
                    {
                    "label": "Q1",
                    "value": "102000",
                    "displayValue": "Q1, $102K"
                    },
                    {
                    "label": "Q2",
                    "value": "142000",
                    "displayValue": "Q2, $142K"
                    },
                    {
                    "label": "Q3",
                    "value": "187000",
                    "displayValue": "Q3, $187K"
                    },
                    {
                    "label": "Q4",
                    "value": "189000",
                    "displayValue": "Q4, $189K"
                    }
                ]
                }
            },
            {
                "id": "grape",
                "linkedchart": {
                "chart": {
                    "caption": "Grape Juice - Quarterly Sales",
                    "subcaption": "Last year",
                    "numberprefix": "$",
                    "theme": "fusion",
                    "rotateValues": "0",
                    "plottooltext": "$label, $dataValue,  $percentValue"
                },
                "data": [{
                    "label": "Q1",
                    "value": "45000",
                    "displayValue": "Q1, $45K"
                }, {
                    "label": "Q2",
                    "value": "72000",
                    "displayValue": "Q2, $72K"
                }, {
                    "label": "Q3",
                    "value": "95000",
                    "displayValue": "Q3, $95K"
                }, {
                    "label": "Q4",
                    "value": "108000",
                    "displayValue": "Q4, $108K"
                }]
                }
            }
        ]
}`;

const myDataSource = {
  chart: {
    caption: 'Sales of top 3 juice flavors last year',
    subcaption: 'Click on a column to see details',
    xaxisname: 'Flavor',
    yaxisname: 'Amount (In USD)',
    numberprefix: '$',
    theme: 'fusion',
    rotateValues: '0'
  },
  data: [
    {
      label: 'Apple',
      value: '810000',
      link: 'newchart-xml-apple'
    },
    {
      label: 'Cranberry',
      value: '620000',
      link: 'newchart-xml-cranberry'
    },
    {
      label: 'Grape',
      value: '350000',
      link: 'newchart-xml-grape'
    }
  ],
  linkeddata: [
    {
      id: 'apple',
      linkedchart: {
        chart: {
          caption: 'Apple Juice - Quarterly Sales',
          subcaption: 'Last year',
          numberprefix: '$',
          theme: 'fusion',
          rotateValues: '0',
          plottooltext: '$label, $dataValue,  $percentValue'
        },
        data: [
          {
            label: 'Q1',
            value: '157000',
            displayValue: 'Q1, $157K'
          },
          {
            label: 'Q2',
            value: '172000',
            displayValue: 'Q2, $172K'
          },
          {
            label: 'Q3',
            value: '206000',
            displayValue: 'Q3, $206K'
          },
          {
            label: 'Q4',
            value: '275000',
            displayValue: 'Q4, $275K'
          }
        ]
      }
    },
    {
      id: 'cranberry',
      linkedchart: {
        chart: {
          caption: 'Cranberry Juice - Quarterly Sales',
          subcaption: 'Last year',
          numberprefix: '$',
          theme: 'fusion',
          plottooltext: '$label, $dataValue,  $percentValue'
        },
        data: [
          {
            label: 'Q1',
            value: '102000',
            displayValue: 'Q1, $102K'
          },
          {
            label: 'Q2',
            value: '142000',
            displayValue: 'Q2, $142K'
          },
          {
            label: 'Q3',
            value: '187000',
            displayValue: 'Q3, $187K'
          },
          {
            label: 'Q4',
            value: '189000',
            displayValue: 'Q4, $189K'
          }
        ]
      }
    },
    {
      id: 'grape',
      linkedchart: {
        chart: {
          caption: 'Grape Juice - Quarterly Sales',
          subcaption: 'Last year',
          numberprefix: '$',
          theme: 'fusion',
          rotateValues: '0',
          plottooltext: '$label, $dataValue,  $percentValue'
        },
        data: [
          {
            label: 'Q1',
            value: '45000',
            displayValue: 'Q1, $45K'
          },
          {
            label: 'Q2',
            value: '72000',
            displayValue: 'Q2, $72K'
          },
          {
            label: 'Q3',
            value: '95000',
            displayValue: 'Q3, $95K'
          },
          {
            label: 'Q4',
            value: '108000',
            displayValue: 'Q4, $108K'
          }
        ]
      }
    }
  ]
};
export default {
  name: 'DrillDownComponent',
  data() {
    return {
      codeOptions: {
        lineNumbers: true,
        theme: 'dracula',
        tabSize: '4',
        smartIndent: true,
        readOnly: true,
        mode: 'javascript'
      },
      dataSource: myDataSource,
      options: {
        width: '100%',
        height: '400',
        type: 'column2d',
        dataFormat: 'json'
      },
      selectedPanel: 0,
      panels: [
        {
          type: 'Javascript',
          code: sampleCode['ex5'].code,
          mode: 'javascript'
        },
        {
          type: 'Data',
          code: jsonData,
          mode: 'javascript'
        }
      ]
    };
  },
  methods: {
    configureLink: function(chart) {
      this.chartInstance = chart; // Save it for further use

      // Configure Drilldown attributes
      // See this : https://www.fusioncharts.com/dev/api/fusioncharts/fusioncharts-methods#configureLink
      this.chartInstance.configureLink(
        {
          type: 'pie2d',
          overlayButton: {
            message: 'Back',
            color: '6957da',
            bgColor: 'FFFFFF',
            borderColor: '6957da',
            padding: '5'
          }
        },
        0
      );
    },
    selectTab: function(num) {
      this.selectedPanel = num;
    }
  },
  mounted: function() {
    this.configureLink(this.$refs.fc.chartObj);
  }
};
</script>

