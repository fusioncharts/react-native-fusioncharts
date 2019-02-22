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
  "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/annotating-single-data-point-data.json"
).then(jsonify);
var schemaFetch = fetch(
  "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/annotating-single-data-point-schema.json"
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
        dataMarker: [
          {
            seriesName: "Interest Rate",
            time: "Mar-1980",
            identifier: "H",
            timeFormat: "%b-%Y",
            tooltext:
              "As a part of credit control program, under the leadership of Paul Volcker, the Fed tightened the money supply, allowing the federal fund rates to approach 20 percent."
          },
          {
            seriesName: "Interest Rate",
            time: "Aug-1982",
            identifier: "L",
            timeFormat: "%b-%Y",
            tooltext:
              "The FED eases off the monetary brakes, allowing interest rates to fall and the economy to begin a strong recovery."
          },
          {
            seriesName: "Interest Rate",
            time: "Oct-1987",
            identifier: "L",
            timeFormat: "%b-%Y",
            tooltext:
              "The FED is forced to ease rate after the stock market crash."
          },
          {
            seriesName: "Interest Rate",
            time: "May-1989",
            identifier: "H",
            timeFormat: "%b-%Y",
            tooltext:
              "Liquidity problem forced the Fed to increase rate to nearly 10%."
          },
          {
            seriesName: "Interest Rate",
            time: "Sept-1992",
            identifier: "L",
            timeFormat: "%b-%Y",
            tooltext:
              "To fight the jobless economy growth the Fed had to reduce the interest rate to 3%."
          },
          {
            seriesName: "Interest Rate",
            time: "Jun-2003",
            identifier: "L",
            timeFormat: "%b-%Y",
            tooltext:
              "Struggling to revive the economy, the FED cuts it’s benchmark rate to 1%."
          },
          {
            seriesName: "Interest Rate",
            time: "Sep-2007",
            identifier: "L",
            timeFormat: "%b-%Y",
            tooltext: "Fed started reducing the Federal Fund Rate."
          },
          {
            seriesName: "Interest Rate",
            time: "Dec-2008",
            identifier: "L",
            timeFormat: "%b-%Y",
            tooltext:
              "Fed reduced the interest rates to sub 0.25% to manage the menace of longest economic downturn since World War 2"
          }
        ]
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
