<template>
  <div>
    <div class="card shadow">
      <div class="card-body chart-wrapper">
        <div class="chart-wrapper-inner">
          <fusioncharts
            :width="width"
            :height="height"
            :type="type"
            :dataFormat="dataFormat"
            :dataSource="dataSource"
            :style="{ 'text-align': 'center' }"
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
import sampleCode from "../../../assets/samples.js";

var jsonify = res => res.json();
var dataFetch = fetch(
  "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/plotting-multiple-series-on-time-axis-data.json"
).then(jsonify);
var schemaFetch = fetch(
  "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/plotting-multiple-series-on-time-axis-schema.json"
).then(jsonify);

import FusionCharts from "fusioncharts";

export default {
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
      width: "100%",
      height: "400",
      type: "timeseries",
      dataFormat: "json",
      dataSource: {
        caption: {
          text: "Sales Analysis"
        },
        subcaption: {
          text: "Grocery & Footwear"
        },
        series: "Type",
        yAxis: [
          {
            plot: "Sales Value",
            title: "Sale Value",
            format: {
              prefix: "$"
            }
          }
        ],
        // Initially data is set as null
        data: null
      },
      selectedPanel: 0,
      panels: [
        {
          type: "Javascript",
          code: sampleCode["ex17"].code,
          mode: "javascript"
        },
        {
          type: "Data",
          code: sampleCode["ex17"].data,
          mode: "javascript"
        },
        {
          type: "Schema",
          code: sampleCode["ex17"].schema,
          mode: "javascript"
        }
      ]
    };
  },
  beforeMount: function() {
    Promise.all([dataFetch, schemaFetch]).then(res => {
      const data = res[0];
      const schema = res[1];
      const fusionTable = new FusionCharts.DataStore().createDataTable(
        data,
        schema
      );
      this.dataSource.data = fusionTable;
    });
  },
  methods: {
    onChartTypeChange: function(e) {
      const chart = this.$refs.fc.chartObj,
        type = e.target.value.toLowerCase();
      chart.chartType(type);
    },
    selectTab: function(num) {
      this.selectedPanel = num;
    }
  }
};
</script>

<style>
</style>
