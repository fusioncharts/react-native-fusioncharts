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
  "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/single-event-overlay-data.json"
).then(jsonify);
var schemaFetch = fetch(
  "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/single-event-overlay-schema.json"
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
        xAxis: {
          plot: "Time",
          timemarker: [
            {
              start: "Mar-1980",
              label: "US inflation peaked at 14.8%.",
              timeFormat: "%b-%Y",
              style: {
                marker: {
                  fill: "#D0D6F4"
                }
              }
            },
            {
              start: "May-1981",
              label:
                "To control inflation, the Fed started {br} raising interest rates to over {br} 20%.",
              timeFormat: "%b-%Y"
            },
            {
              start: "Jun-1983",
              label:
                "By proactive actions of Mr.Volcker, {br} the inflation falls to 2.4% {br} from the peak of over 14% {br} just three years ago.",
              timeFormat: "%b-%Y",
              style: {
                marker: {
                  fill: "#D0D6F4"
                }
              }
            },
            {
              start: "Oct-1987",
              label:
                "The Dow Jones Industrial Average lost {br} about 30% of it’s value.",
              timeFormat: "%b-%Y",
              style: {
                marker: {
                  fill: "#FBEFCC"
                }
              }
            },
            {
              start: "Jan-1989",
              label: "George H.W. Bush becomes {br} the 41st president of US!",
              timeFormat: "%b-%Y"
            },
            {
              start: "Aug-1990",
              label:
                "The oil prices spiked to $35 {br} per barrel from $15 per barrel {br} because of the Gulf War.",
              timeFormat: "%b-%Y"
            },
            {
              start: "Dec-1996",
              label:
                'Alan Greenspan warns of the dangers {br} of "irrational exuberance" in financial markets, {br} an admonition that goes unheeded',
              timeFormat: "%b-%Y"
            },
            {
              start: "Sep-2008",
              label: "Lehman Brothers collapsed!",
              timeFormat: "%b-%Y"
            },
            {
              start: "Mar-2009",
              label:
                "The net worth of US households {br} stood at a trough of $55 trillion.",
              timeFormat: "%b-%Y",
              style: {
                marker: {
                  fill: "#FBEFCC"
                }
              }
            },
            {
              start: "Oct-2009",
              label: "Unemployment rate peaked {br} in given times to 10%.",
              timeFormat: "%b-%Y"
            }
          ]
        }
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
  }
};
</script>

<style>
</style>
