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
            @dataplotClick="dataplotClick"
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
const jsonData = `{
    "chart": {
        "caption": "Average Annual Population Growth",
        "subcaption": " 1955-2015",
        "numbersuffix": "%",
        "includevalueinlabels": "1",
        "labelsepchar": ": ",
        "entityFillHoverColor": "#FFF9C4",
        "theme": "fusion"
    },
    "colorrange": {
        "minvalue": "0",
        "code": "#FFE0B2",
        "gradient": "1",
        "color": [

            {
                "minvalue": "0.5",
                "maxvalue": "1.0",
                "color": "#FFD74D"
            },
            {
                "minvalue": "1.0",
                "maxvalue": "2.0",
                "color": "#FB8C00"
            },
            {
                "minvalue": "2.0",
                "maxvalue": "3.0",
                "color": "#E65100"
            }
        ]
    },
    "data": [{
            "id": "NA",
            "value": ".82",
            "showLabel": "1"

        },
        {
            "id": "SA",
            "value": "2.04",
            "showLabel": "1"
        },
        {
            "id": "AS",
            "value": "1.78",
            "showLabel": "1"

        },
        {
            "id": "EU",
            "value": ".40",
            "showLabel": "1"
        },
        {
            "id": "AF",
            "value": "2.58",
            "showLabel": "1"
        },
        {
            "id": "AU",
            "value": "1.30",
            "showLabel": "1"
        }
    ]
}`;

const myDataSource = {
  chart: {
    caption: "Average Annual Population Growth",
    subcaption: " 1955-2015",
    numbersuffix: "%",
    includevalueinlabels: "1",
    labelsepchar: ": ",
    entityFillHoverColor: "#FFF9C4",
    theme: "fusion"
  },
  colorrange: {
    minvalue: "0",
    code: "#FFE0B2",
    gradient: "1",
    color: [
      {
        minvalue: "0.5",
        maxvalue: "1.0",
        color: "#FFD74D"
      },
      {
        minvalue: "1.0",
        maxvalue: "2.0",
        color: "#FB8C00"
      },
      {
        minvalue: "2.0",
        maxvalue: "3.0",
        color: "#E65100"
      }
    ]
  },
  data: [
    {
      id: "NA",
      value: ".82",
      showLabel: "1"
    },
    {
      id: "SA",
      value: "2.04",
      showLabel: "1"
    },
    {
      id: "AS",
      value: "1.78",
      showLabel: "1"
    },
    {
      id: "EU",
      value: ".40",
      showLabel: "1"
    },
    {
      id: "AF",
      value: "2.58",
      showLabel: "1"
    },
    {
      id: "AU",
      value: "1.30",
      showLabel: "1"
    }
  ]
};
export default {
  name: "RenderAMap",
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
      type: "world",
      width: "100%",
      height: "400",
      dataFormat: "json",
      dataSource: myDataSource,
      selectedPanel: 0,
      panels: [
        {
          type: "Javascript",
          code: sampleCode["ex22"].code,
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
  created: function() {
    let myData = this.dataSource.data;
    this.total = myData.reduce((p, c) => p + Number(c.value), 0);
  },
  methods: {
    // uses the data of of the event and represents it
    dataplotClick: function(e) {
      let value = ((e.data.value / this.total) * 100).toFixed(2);
      let category = e.data.categoryLabel;
      alert(`${category} is ${value}% of top 8 oil reserve countries`);
    },
    selectTab: function(num) {
      this.selectedPanel = num;
    }
  }
};
</script>

