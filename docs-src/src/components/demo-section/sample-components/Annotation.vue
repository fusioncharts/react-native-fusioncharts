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
import sampleCode from "../../../assets/samples.js";

const jsonData = `{
    "chart": {
        "caption": "Bakersfield Central - Total footfalls",
        "subCaption": "Last week",
        "xAxisName": "Day",
        "yAxisName": "No. of Visitors (In 1000s)",
        "showValues": "0",
        "theme": "fusion"
    },
    "annotations": {
        "groups": [
            {
                "id": "anchor-highlight",
                "items": [
                    {
                        "id": "high-star",
                        "type": "circle",
                        "x": "$dataset.0.set.2.x",
                        "y": "$dataset.0.set.2.y",
                        "radius": "12",
                        "color": "#6baa01",
                        "border": "2",
                        "borderColor": "#f8bd19"
                    },
                    {
                        "id": "label",
                        "type": "text",
                        "text": "Highest footfall 25.5K",
                        "fillcolor": "#6baa01",
                        "rotate": "90",
                        "x": "$dataset.0.set.2.x+75",
                        "y": "$dataset.0.set.2.y-2"
                    }
                ]
            }
        ]
    },
    "data": [
        {
            "label": "Mon",
            "value": "15123"
        },
        {
            "label": "Tue",
            "value": "14233"
        },
        {
            "label": "Wed",
            "value": "25507"
        },
        {
            "label": "Thu",
            "value": "9110"
        },
        {
            "label": "Fri",
            "value": "15529"
        },
        {
            "label": "Sat",
            "value": "20803"
        },
        {
            "label": "Sun",
            "value": "19202"
        }
    ]
}`;

const myDataSource = {
  chart: {
    caption: "Bakersfield Central - Total footfalls",
    subCaption: "Last week",
    xAxisName: "Day",
    yAxisName: "No. of Visitors (In 1000s)",
    showValues: "0",
    theme: "fusion"
  },
  annotations: {
    groups: [
      {
        id: "anchor-highlight",
        items: [
          {
            id: "high-star",
            type: "circle",
            x: "$dataset.0.set.2.x",
            y: "$dataset.0.set.2.y",
            radius: "12",
            color: "#6baa01",
            border: "2",
            borderColor: "#f8bd19"
          },
          {
            id: "label",
            type: "text",
            text: "Highest footfall 25.5K",
            fillcolor: "#6baa01",
            rotate: "90",
            x: "$dataset.0.set.2.x+75",
            y: "$dataset.0.set.2.y-2"
          }
        ]
      }
    ]
  },
  data: [
    {
      label: "Mon",
      value: "15123"
    },
    {
      label: "Tue",
      value: "14233"
    },
    {
      label: "Wed",
      value: "25507"
    },
    {
      label: "Thu",
      value: "9110"
    },
    {
      label: "Fri",
      value: "15529"
    },
    {
      label: "Sat",
      value: "20803"
    },
    {
      label: "Sun",
      value: "19202"
    }
  ]
};
export default {
  name: "Annotation",
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
      type: "spline",
      width: "100%",
      height: "400",
      dataFormat: "json",
      dataSource: myDataSource,
      selectedPanel: 0,
      panels: [
        {
          type: "Javascript",
          code: sampleCode["ex28"].code,
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
    selectTab: function(num) {
      this.selectedPanel = num;
    }
  }
};
</script>

