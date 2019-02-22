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

const jsonData = `{
    "chart": {
        "caption": "Recommended Portfolio Split",
        "subCaption" : "For a net-worth of $1M",
        "showValues":"1",
        "showPercentInTooltip" : "0",
        "numberPrefix" : "$",
        "enableMultiSlicing":"1",
        "theme": "fusion"
    },
    "data": [{
        "label": "Equity",
        "value": "300000"
    }, {
        "label": "Debt",
        "value": "230000"
    }, {
        "label": "Bullion",
        "value": "180000"
    }, {
        "label": "Real-estate",
        "value": "270000"
    }, {
        "label": "Insurance",
        "value": "20000"
    }]
}`;

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
      sourceData: `{
    "chart": {
        "caption": "Recommended Portfolio Split",
        "subCaption" : "For a net-worth of $1M",
        "showValues":"1",
        "showPercentInTooltip" : "0",
        "numberPrefix" : "$",
        "enableMultiSlicing":"1",
        "theme": "fusion"
    },
    "data": [{
        "label": "Equity",
        "value": "300000"
    }, {
        "label": "Debt",
        "value": "230000"
    }, {
        "label": "Bullion",
        "value": "180000"
    }, {
        "label": "Real-estate",
        "value": "270000"
    }, {
        "label": "Insurance",
        "value": "20000"
    }]
}`,
      width: "100%",
      height: "400",
      type: "timeseries",
      dataFormat: "json",
      dataSource: {
        data: null,
        series: "Type"
      },
      selectedPanel: 0,
      panels: [
        {
          type: "Javascript",
          code: sampleCode["ex8"].code,
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
  }
};
</script>

<style>
</style>
