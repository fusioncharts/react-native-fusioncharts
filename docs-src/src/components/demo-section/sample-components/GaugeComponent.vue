<template>
  <div>
    <div class="card shadow">
      <div class="card-body chart-wrapper">
        <div class="chart-wrapper-inner">
          <fusioncharts
            :type="type"
            :width="width"
            :height="height"
            :dataFormat="dataFormat"
            :dataSource="dataSource"
          ></fusioncharts>
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
        "caption": "Nordstorm's Customer Satisfaction Score for 2017",
        "lowerLimit": "0",
        "upperLimit": "100",
        "showValue": "1",
        "numberSuffix": "%",
        "theme": "fusion",
        "showToolTip": "0"
    },
    "colorRange": {
        "color": [{
            "minValue": "0",
            "maxValue": "50",
            "code": "#F2726F"
        }, {
            "minValue": "50",
            "maxValue": "75",
            "code": "#FFC533"
        }, {
            "minValue": "75",
            "maxValue": "100",
            "code": "#62B58F"
        }]
    },
    "dials": {
          "dial": [{
              "value": "81"
          }]
    }
}`;

const myDataSource = {
  chart: {
    caption: "Nordstorm's Customer Satisfaction Score for 2017",
    lowerLimit: '0',
    upperLimit: '100',
    showValue: '1',
    numberSuffix: '%',
    theme: 'fusion',
    showToolTip: '0'
  },
  colorRange: {
    color: [
      {
        minValue: '0',
        maxValue: '50',
        code: '#F2726F'
      },
      {
        minValue: '50',
        maxValue: '75',
        code: '#FFC533'
      },
      {
        minValue: '75',
        maxValue: '100',
        code: '#62B58F'
      }
    ]
  },
  dials: {
    dial: [
      {
        value: '81'
      }
    ]
  }
};
export default {
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
      type: 'angulargauge',
      width: '100%',
      height: '400',
      dataFormat: 'json',
      dataSource: myDataSource,
      selectedPanel: 0,
      panels: [
        {
          type: 'Javascript',
          code: sampleCode['ex6'].code,
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
    selectTab: function(num) {
      this.selectedPanel = num;
    }
  }
};
</script>

