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
  "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/date-range-event-overlay-data.json"
).then(jsonify);
var schemaFetch = fetch(
  "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/date-range-event-overlay-schema.json"
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
        data: null,
        caption: {
          text: "Interest Rate Analysis"
        },
        subCaption: {
          text: "Federal Reserve (USA)"
        },
        yAxis: [
          {
            plot: "Interest Rate",
            format: {
              suffix: "%"
            },
            title: "Interest Rate"
          }
        ],
        xAxis: {
          plot: "Time",
          timemarker: [
            {
              start: "Jul-1981",
              end: "Nov-1982",
              label:
                "Economic downturn was triggered by {br} tight monetary policy in an effort to {br} fight mounting inflation.",
              timeFormat: "%b-%Y"
            },
            {
              start: "Jul-1990",
              end: "Mar-1991",
              label:
                "This eight month recession period {br} was characterized by a sluggish employment recovery, {br} most commonly referred to as a jobless recovery.",
              timeFormat: "%b-%Y"
            },
            {
              start: "Jun-2004",
              end: "Jul-2006",
              label:
                "The Fed after raising interest rates {br} at 17 consecutive meetings, ends its campaign {br} to slow the economy and forestall inflation.",
              timeFormat: "%b-%Y"
            },
            {
              start: "Dec-2007",
              end: "Jun-2009",
              label:
                "Recession caused by the worst {br} collapse of financial system in recent {br} times.",
              timeFormat: "%b-%Y"
            }
          ]
        }
      },
      selectedPanel: 0,
      panels: [
        {
          type: "Javascript",
          code: sampleCode["ex15"].code,
          mode: "javascript"
        },
        {
          type: "Data",
          code: sampleCode["ex15"].data,
          mode: "javascript"
        }
      ]
    };
  },
  mounted: function() {
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
