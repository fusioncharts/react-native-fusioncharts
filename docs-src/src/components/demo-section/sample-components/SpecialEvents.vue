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
            @dataplotdragend="dataplotdragend"
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
import FusionCharts from "fusioncharts";
const jsonData = `{
    "chart": {
        "caption": "Android and iOS Devices Sales Projections",
        "subCaption": "Drag the top of columns to adjust projections for 2017 & 2018",
        "numberPrefix": "$",
        "numberSuffix": "M",
        "yaxismaxvalue": "200",
        "theme": "fusion",
        "plotToolText": "<b>$label</b><br>$seriesName: <b>$dataValue</b>"
      },
      "categories": [{
        "category": [{
          "label": "2014",
          "fontItalic": "0"
        }, {
          "label": "2015",
          "fontItalic": "0"
        }, {
          "label": "2016",
          "fontItalic": "0"
        }, {
          "label": "2017 (Projected)"
        }, {
          "label": "2018 (Projected)"
        }]
      }],
      "dataset": [{
        "seriesname": "Android Devices",
        "data": [{
          "value": "73",
          "alpha": "100",
          "allowDrag": "0"
        }, {
          "value": "80",
          "alpha": "100",
          "allowDrag": "0"
        }, {
          "value": "97",
          "alpha": "100",
          "allowDrag": "0"
        }, {
          "value": "110",
          "toolText": "<b>$label</b><br>$seriesName: <b>$dataValue</b>"
        }, {
          "value": "180",
          "toolText": "<b>$label</b><br>$seriesName: <b>$dataValue</b>"
        }]
      }, {
        "seriesname": "iOS Devices",
        "data": [{
          "value": "63.2",
          "alpha": "100",
          "allowDrag": "0"
        }, {
          "value": "68",
          "alpha": "100",
          "allowDrag": "0"
        }, {
          "value": "82",
          "alpha": "100",
          "allowDrag": "0"
        }, {
          "value": "99",
          "toolText": "<b>$label</b><br>$seriesName: <b>$dataValue</b>"
        }, {
          "value": "150",
          "toolText": "<b>$label</b><br>$seriesName: <b>$dataValue</b>"
        }]
      }]
    }`;

const myDataSource = {
  chart: {
    caption: "Android and iOS Devices Sales Projections",
    subCaption: "Drag the top of columns to adjust projections for 2017 & 2018",
    numberPrefix: "$",
    numberSuffix: "M",
    yaxismaxvalue: "200",
    theme: "fusion",
    plotToolText: "<b>$label</b><br>$seriesName: <b>$dataValue</b>"
  },
  categories: [
    {
      category: [
        {
          label: "2014",
          fontItalic: "0"
        },
        {
          label: "2015",
          fontItalic: "0"
        },
        {
          label: "2016",
          fontItalic: "0"
        },
        {
          label: "2017 (Projected)"
        },
        {
          label: "2018 (Projected)"
        }
      ]
    }
  ],
  dataset: [
    {
      seriesname: "Android Devices",
      data: [
        {
          value: "73",
          alpha: "100",
          allowDrag: "0"
        },
        {
          value: "80",
          alpha: "100",
          allowDrag: "0"
        },
        {
          value: "97",
          alpha: "100",
          allowDrag: "0"
        },
        {
          value: "110",
          toolText: "<b>$label</b><br>$seriesName: <b>$dataValue</b>"
        },
        {
          value: "180",
          toolText: "<b>$label</b><br>$seriesName: <b>$dataValue</b>"
        }
      ]
    },
    {
      seriesname: "iOS Devices",
      data: [
        {
          value: "63.2",
          alpha: "100",
          allowDrag: "0"
        },
        {
          value: "68",
          alpha: "100",
          allowDrag: "0"
        },
        {
          value: "82",
          alpha: "100",
          allowDrag: "0"
        },
        {
          value: "99",
          toolText: "<b>$label</b><br>$seriesName: <b>$dataValue</b>"
        },
        {
          value: "150",
          toolText: "<b>$label</b><br>$seriesName: <b>$dataValue</b>"
        }
      ]
    }
  ]
};
export default {
  name: "SpecialEvents",
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
      type: "dragcolumn2d",
      width: "100%",
      height: "400",
      dataFormat: "json",
      dataSource: myDataSource,
      selectedPanel: 0,
      panels: [
        {
          type: "Javascript",
          code: sampleCode["ex24"].code,
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
    // uses the data of of the event and represents it
    dataplotdragend: function(e) {
      let label = JSON.parse(this.sourceData).categories[0].category[
        e.data.dataIndex
      ].label;
      let startValue = FusionCharts.formatNumber(e.data.startValue, {
          decimals: 2
        }),
        endValue = FusionCharts.formatNumber(e.data.endValue, { decimals: 2 });
      this.message = `<b>${
        e.data.datasetName
      }</b> is modified to <b>${endValue}M</b> from <b>${startValue}M</b> for <b>${label}</b>`;
    },
    selectTab: function(num) {
      this.selectedPanel = num;
    }
  }
};
</script>

