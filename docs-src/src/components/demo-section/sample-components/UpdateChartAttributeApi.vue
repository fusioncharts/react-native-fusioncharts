<template>
  <div>
    <div class="card shadow">
      <div class="card-body chart-wrapper">
        <div class="chart-wrapper-inner">
          <fusioncharts
            :type="type"
            :width="width"
            :height="height"
            ref="fc"
            :dataFormat="dataFormat"
            :dataSource="dataSource"
          ></fusioncharts>
        </div>
        <div :style="{textAlign: 'center'}">
          <button
            class="btn btn-outline-secondary btn-sm"
            @click="changeCaption"
          >CHANGE CAPTION TO: CAPTION</button>
          <button
            class="btn btn-outline-secondary btn-sm"
            @click="changeXAxisName"
          >CHANGE X_AXIS NAME TO: X-AXIS NAME</button>
          <button
            class="btn btn-outline-secondary btn-sm"
            @click="changeYAxisName"
          >CHANGE Y_AXIS NAME TO: Y-AXIS NAME</button>
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
import sampleCode from "../../../assets/samples.js";

const jsonData = `{
    "chart": {
        "caption": "Countries With Most Oil Reserves [2017-18]",
        "subCaption": "In MMbbl = One Million barrels",
        "xAxisName": "Country",
        "yAxisName": "Reserves (MMbbl)",
        "numberSuffix": "K",
        "theme": "fusion"
    },
    "data": [{
        "label": "Venezuela",
        "value": "290"
    }, {
        "label": "Saudi",
        "value": "260"
    }, {
        "label": "Canada",
        "value": "180"
    }, {
        "label": "Iran",
        "value": "140"
    }, {
        "label": "Russia",
        "value": "115"
    }, {
        "label": "UAE",
        "value": "100"
    }, {
        "label": "US",
        "value": "30"
    }, {
        "label": "China",
        "value": "30"
    }]
}`;

const myDataSource = {
  chart: {
    caption: "Countries With Most Oil Reserves [2017-18]",
    subCaption: "In MMbbl = One Million barrels",
    xAxisName: "Country",
    yAxisName: "Reserves (MMbbl)",
    numberSuffix: "K",
    theme: "fusion"
  },
  data: [
    {
      label: "Venezuela",
      value: "290"
    },
    {
      label: "Saudi",
      value: "260"
    },
    {
      label: "Canada",
      value: "180"
    },
    {
      label: "Iran",
      value: "140"
    },
    {
      label: "Russia",
      value: "115"
    },
    {
      label: "UAE",
      value: "100"
    },
    {
      label: "US",
      value: "30"
    },
    {
      label: "China",
      value: "30"
    }
  ]
};
export default {
  name: "UpdateChartAttributeApi",
  data() {
    return {
      codeOptions: {
        lineNumbers: true,
        theme: "dracula",
        tabSize: "4",
        smartIndent: true,
        readOnly: true,
        mode: "javascript"
      },
      type: "column2d",
      width: "100%",
      height: "400",
      dataFormat: "json",
      dataSource: myDataSource,
      selectedPanel: 0,
      panels: [
        {
          type: "Javascript",
          code: sampleCode["ex29"].code,
          mode: "javascript"
        },
        {
          type: "Data",
          code: jsonData,
          mode: "javascript"
        }
      ]
    };
  },
  methods: {
    changeCaption: function() {
      const chart = this.$refs.fc.chartObj;
      chart.setChartAttribute("caption", "Caption");
    },
    changeXAxisName: function() {
      const chart = this.$refs.fc.chartObj;
      chart.setChartAttribute("xAxisName", "X-Axis Name");
    },
    changeYAxisName: function() {
      const chart = this.$refs.fc.chartObj;
      chart.setChartAttribute("yAxisName", "Y-Axis Name");
    },
    selectTab: function(num) {
      this.selectedPanel = num;
    }
  }
};
</script>

