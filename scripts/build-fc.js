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
const crypto = require('crypto');

const { modules, scripts } = require('../src/FusionChartsModule.js');

const root = path.resolve(__dirname, '..');
const fcSource = path.join(root, 'node_modules', 'fusioncharts');
const fcDest = path.join(root, 'src', 'modules', 'fusioncharts');
const inputFilePath = path.join(root, 'src', 'modules', 'index.html');
const outputFilePath = path.join(root, 'src', 'modules', 'layout.js');
const jsOutputFilePath = path.join(root, 'src', 'modules', 'scripts.js');
const modulesOutputFilePath = path.join(root, 'src', 'modules', 'modules.js');
const fontManifestPath = path.join(
  root,
  'docs',
  'provenance',
  'fusioncharts-fonts-4.2.2.json'
);

// Directories whose top-level .js files become .fcscript. Non-recursive, matching
// the globs the gulp task used ('*.js', 'maps/es/*.js', 'themes/*.js').
const renameDirs = ['', 'maps/es', 'themes'];

// Upstream metadata that must not be vendored into this repository.
// `fusioncharts` publishes a LICENSE.md containing the MIT text with Meta
// Platforms as the copyright holder, even though the package itself is
// commercial ("license": "http://www.fusioncharts.com/buy/"). Copying that file
// in would put an incorrect licence for the bundled library inside this repo.
// Only the library's JavaScript is needed as build input; the licensing of the
// bundled distribution is stated in THIRD_PARTY_NOTICES.md and LICENSE.md.
const upstreamMetadataToDrop = ['package.json', 'LICENSE.md', 'README.md'];

async function copyFusionCharts() {
  await fs.rm(fcDest, { recursive: true, force: true });
  await fs.cp(fcSource, fcDest, { recursive: true });
  for (const entry of upstreamMetadataToDrop) {
    await fs.rm(path.join(fcDest, entry), { force: true });
  }
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

async function listFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(entry => {
      const filePath = path.join(directory, entry.name);
      return entry.isDirectory() ? listFiles(filePath) : [filePath];
    })
  );
  return nested.flat();
}

async function verifyFile(record) {
  const filePath = path.join(root, record.path);
  const contents = await fs.readFile(filePath);
  const actual = crypto.createHash('sha256').update(contents).digest('hex');
  if (actual !== record.sha256) {
    throw new Error(
      `Integrity check failed for ${record.path}: expected ${record.sha256}, got ${actual}`
    );
  }
  return contents;
}

async function inlineThemeFonts() {
  const manifest = JSON.parse(await fs.readFile(fontManifestPath, 'utf8'));
  const verified = await Promise.all(
    manifest.files.map(async record => [record, await verifyFile(record)])
  );
  const fontRecords = verified.filter(([record]) =>
    record.source.startsWith('https://fonts.gstatic.com/')
  );
  const replacements = new Map(
    fontRecords.map(([record, contents]) => [
      record.source,
      `data:font/woff2;base64,${contents.toString('base64')}`,
    ])
  );
  const scriptFiles = (await listFiles(fcDest)).filter(file =>
    file.endsWith('.fcscript')
  );
  let replaced = 0;

  for (const file of scriptFiles) {
    let source = await fs.readFile(file, 'utf8');
    for (const [remoteUrl, dataUrl] of replacements) {
      const occurrences = source.split(remoteUrl).length - 1;
      if (occurrences > 0) {
        replaced += occurrences;
        source = source.split(remoteUrl).join(dataUrl);
      }
    }
    if (source.includes('fonts.gstatic.com')) {
      throw new Error(`Unpinned remote font URL remains in ${file}`);
    }
    await fs.writeFile(file, source);
  }

  if (replaced !== manifest.font_urls_rewritten) {
    throw new Error(
      `Expected ${manifest.font_urls_rewritten} remote font URLs, replaced ${replaced}`
    );
  }
  console.log(`${replaced} theme font URLs inlined successfully!`);
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
  await inlineThemeFonts();
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
