const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const fusionChartsLibPath = '../../node_modules/fusioncharts';
const outputFilePath = '../../assets/fusioncharts.html';
const fileReadOptions = { encoding: 'utf8' };

const template = fs.readFileSync(path.join(__dirname, 'template.ejs'), fileReadOptions);
const FusionCharts = {
  Core: fs.readFileSync(path.join(__dirname, fusionChartsLibPath, 'fusioncharts.js'), fileReadOptions),
  Charts: fs.readFileSync(path.join(__dirname, fusionChartsLibPath, 'fusioncharts.charts.js'), fileReadOptions),
  Gantt: fs.readFileSync(path.join(__dirname, fusionChartsLibPath, 'fusioncharts.gantt.js'), fileReadOptions),
  PowerCharts: fs.readFileSync(path.join(__dirname, fusionChartsLibPath, 'fusioncharts.powercharts.js'), fileReadOptions),
  SSGrid: fs.readFileSync(path.join(__dirname, fusionChartsLibPath, 'fusioncharts.ssgrid.js'), fileReadOptions),
  TreeMap: fs.readFileSync(path.join(__dirname, fusionChartsLibPath, 'fusioncharts.treemap.js'), fileReadOptions),
  Widgets: fs.readFileSync(path.join(__dirname, fusionChartsLibPath, 'fusioncharts.widgets.js'), fileReadOptions),
  ZoomScatter: fs.readFileSync(path.join(__dirname, fusionChartsLibPath, 'fusioncharts.zoomscatter.js'), fileReadOptions),
  Maps: fs.readFileSync(path.join(__dirname, fusionChartsLibPath, 'fusioncharts.maps.js'), fileReadOptions),
  USAMap: fs.readFileSync(path.join(__dirname, fusionChartsLibPath, 'maps', 'fusioncharts.usa.js'), fileReadOptions),
  WorldMap: fs.readFileSync(path.join(__dirname, fusionChartsLibPath, 'maps', 'fusioncharts.world.js'), fileReadOptions),
  FintTheme: fs.readFileSync(path.join(__dirname, fusionChartsLibPath, 'themes', 'fusioncharts.theme.fint.js'), fileReadOptions),
  OceanTheme: fs.readFileSync(path.join(__dirname, fusionChartsLibPath, 'themes', 'fusioncharts.theme.ocean.js'), fileReadOptions),
  ZuneTheme: fs.readFileSync(path.join(__dirname, fusionChartsLibPath, 'themes', 'fusioncharts.theme.zune.js'), fileReadOptions),
  CarbonTheme: fs.readFileSync(path.join(__dirname, fusionChartsLibPath, 'themes', 'fusioncharts.theme.carbon.js'), fileReadOptions),
};

const compiledHTML = ejs.render(template, { FusionCharts });
fs.writeFileSync(path.join(__dirname, outputFilePath), compiledHTML);