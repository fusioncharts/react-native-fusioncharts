#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const program = require('commander');
const mkdirp = require('mkdirp');
const cheerio = require('cheerio');
const ejs = require('ejs');
const pkg = require('../package.json');

program
  .version(pkg.version)
  .option('-t, --fc-template <path>', 'set the fusioncharts module dependency template file path')
  .option('-l, --fc-library <path>', 'set the fusioncharts library location')
  .option('-o, --output-path <path>', 'set the output path for build html file')
  .parse(process.argv);

let { fcTemplate, fcLibrary, outputPath } = program;

fcTemplate = fcTemplate ? path.resolve(fcTemplate) : path.resolve(path.join(__dirname, 'fusioncharts.html'));
fcLibrary = fcLibrary ? path.resolve(fcLibrary) : path.resolve(path.join('node_modules', 'fusioncharts'));
outputPath = outputPath ? path.resolve(outputPath) : path.resolve('assets');

if (!fs.existsSync(fcTemplate)) {
  throw new Error(`FusionCharts module dependency template file: ${fcTemplate} does not exist`);
}

if (!fs.existsSync(fcLibrary)) {
  throw new Error(`FusionCharts library: ${fcLibrary} does not exist`);
}

if (!fs.existsSync(outputPath)) {
  mkdirp.sync(outputPath);
}

const fileReadOptions = { encoding: 'utf8' };
const fcModules = [];

const $ = cheerio.load(fs.readFileSync(fcTemplate, fileReadOptions));
$('script').each(function () {
  const scriptSrc = $(this).attr('src');
  if (!scriptSrc || !scriptSrc.startsWith('fusioncharts')) { return; }
  const moduleRelPath = scriptSrc.replace(/^fusioncharts/, '');
  const moduleAbsPath = path.resolve(path.join(fcLibrary, moduleRelPath));
  fcModules.push(fs.readFileSync(moduleAbsPath, fileReadOptions));
});

const outputEJSTemplateFile = path.resolve(path.join(__dirname, 'template.ejs'));
const template = fs.readFileSync(outputEJSTemplateFile, fileReadOptions);

const compiledHTML = ejs.render(template, { modules: fcModules });
fs.writeFileSync(path.join(outputPath, 'fusioncharts.html'), compiledHTML);
