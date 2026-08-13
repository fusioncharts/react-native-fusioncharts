/**
 * Builds the inlined FusionCharts bundle consumed by the WebView.
 *
 * Replaces the previous gulp pipeline (`clean:FC` + `copy:FC` + `clean:package` + `gulp`).
 * Same inputs, same outputs, no build-only dependencies:
 *   1. copy node_modules/fusioncharts -> src/modules/fusioncharts (minus its package.json)
 *   2. rename the .js modules to .fcscript so Metro does not bundle them as source
 *   3. emit layout.js (index.html as a template string), scripts.js and modules.js
 *      (the module maps from src/FusionChartsModule.js, with each path inlined)
 */

const path = require('path');
const fs = require('fs').promises;

const { modules, scripts } = require('../src/FusionChartsModule.js');

const root = path.resolve(__dirname, '..');
const fcSource = path.join(root, 'node_modules', 'fusioncharts');
const fcDest = path.join(root, 'src', 'modules', 'fusioncharts');
const inputFilePath = path.join(root, 'src', 'modules', 'index.html');
const outputFilePath = path.join(root, 'src', 'modules', 'layout.js');
const jsOutputFilePath = path.join(root, 'src', 'modules', 'scripts.js');
const modulesOutputFilePath = path.join(root, 'src', 'modules', 'modules.js');

// Directories whose top-level .js files become .fcscript. Non-recursive, matching
// the globs the gulp task used ('*.js', 'maps/es/*.js', 'themes/*.js').
const renameDirs = ['', 'maps/es', 'themes'];

async function copyFusionCharts() {
  await fs.rm(fcDest, { recursive: true, force: true });
  await fs.cp(fcSource, fcDest, { recursive: true });
  await fs.rm(path.join(fcDest, 'package.json'), { force: true });
}

async function renameToFcScript() {
  for (const dir of renameDirs) {
    const absDir = path.join(fcDest, dir);
    const entries = await fs.readdir(absDir, { withFileTypes: true });
    const jsFiles = entries.filter(
      entry => entry.isFile() && path.extname(entry.name) === '.js'
    );

    await Promise.all(
      jsFiles.map(entry => {
        const from = path.join(absDir, entry.name);
        const to = path.join(absDir, `${path.basename(entry.name, '.js')}.fcscript`);
        return fs.rename(from, to);
      })
    );
  }
}

// Walks the module map and swaps every path for the contents of that file.
async function replacePathsWithContents(obj) {
  const reads = [];

  function traverse(node) {
    for (const key in node) {
      if (typeof node[key] === 'string') {
        const filePath = path.join(root, node[key]);
        reads.push(
          fs.readFile(filePath, 'utf8').then(data => {
            node[key] = data;
          })
        );
      } else if (typeof node[key] === 'object') {
        traverse(node[key]);
      }
    }
  }

  traverse(obj);
  await Promise.all(reads);
}

async function writeLayout() {
  const data = await fs.readFile(inputFilePath, 'utf8');
  // Escape backticks and dollar signs to prevent issues in the template string
  const escapedContent = data.replace(/`/g, '\\`').replace(/\$/g, '\\$');
  await fs.writeFile(outputFilePath, `export default \`${escapedContent}\`;`);
  console.log('layout.js created successfully!');
}

async function build() {
  await copyFusionCharts();
  await renameToFcScript();
  await writeLayout();

  await replacePathsWithContents(scripts);
  await fs.writeFile(jsOutputFilePath, `export default ${JSON.stringify(scripts)};`);
  console.log('scripts.js created successfully!');

  await replacePathsWithContents(modules);
  await fs.writeFile(modulesOutputFilePath, `export default ${JSON.stringify(modules)};`);
  console.log('modules.js created successfully!');
}

build().catch(err => {
  console.error('Error:', err);
  process.exitCode = 1;
});
