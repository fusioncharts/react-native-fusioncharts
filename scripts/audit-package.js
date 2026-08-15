#!/usr/bin/env node

const {execFileSync} = require('child_process');
const fs = require('fs');
const path = require('path');

const archivePath = process.argv[2];

if (!archivePath) {
  throw new Error('Usage: node scripts/audit-package.js <package.tgz>');
}

const resolvedArchive = path.resolve(archivePath);

if (!fs.statSync(resolvedArchive).isFile()) {
  throw new Error(`Package archive does not exist: ${resolvedArchive}`);
}

const entries = execFileSync('tar', ['-tzf', resolvedArchive], {
  encoding: 'utf8',
})
  .trim()
  .split('\n')
  .filter(Boolean);
const entrySet = new Set(entries);
const packageJson = JSON.parse(
  execFileSync('tar', ['-xOzf', resolvedArchive, 'package/package.json'], {
    encoding: 'utf8',
  }),
);

if (packageJson.name !== 'react-native-fusioncharts') {
  throw new Error(`Unexpected package name: ${packageJson.name}`);
}

if (packageJson.version !== '7.0.0-rc.0') {
  throw new Error(`Expected immutable release candidate 7.0.0-rc.0; found ${packageJson.version}`);
}

const requiredEntries = [
  'package/index.js',
  'package/index.d.ts',
  'package/package.json',
  'package/src/FusionCharts.js',
  'package/src/modules/layout.js',
  'package/src/modules/modules.js',
  'package/src/modules/scripts.js',
  'package/src/modules/exportBridge.js',
  'package/src/utils/export.js',
  'package/THIRD_PARTY_NOTICES.md',
  'package/docs/provenance/fusioncharts-fonts-4.2.2.json',
  'package/licenses/fonts/FIRA_SANS_OFL.txt',
  'package/licenses/fonts/SOURCE_SANS_PRO_OFL.txt',
  'package/licenses/fonts/TITILLIUM_WEB_OFL.txt',
];

for (const entry of requiredEntries) {
  if (!entrySet.has(entry)) {
    throw new Error(`Required release file is missing: ${entry}`);
  }
}

const forbiddenPatterns = [
  /^package\/.github\//,
  /^package\/__tests__\//,
  /^package\/assets\//,
  /^package\/app\.json$/,
  /^package\/babel\.config\.js$/,
  /^package\/coverage\//,
  /^package\/examples\//,
  /^package\/jest(?:-setup|\.config)\.js$/,
  /^package\/node_modules\//,
  /^package\/scripts\//,
  /^package\/src\/modules\/fusioncharts\//,
  /^package\/src\/modules\/index\.html$/,
];

for (const entry of entries) {
  const forbiddenPattern = forbiddenPatterns.find(pattern => pattern.test(entry));

  if (forbiddenPattern) {
    throw new Error(`Forbidden release file is present: ${entry}`);
  }
}

for (const bundlePath of [
  'package/src/modules/layout.js',
  'package/src/modules/modules.js',
  'package/src/modules/scripts.js',
]) {
  const source = execFileSync('tar', ['-xOzf', resolvedArchive, bundlePath], {
    encoding: 'utf8',
    maxBuffer: 30 * 1024 * 1024,
  });

  if (/fonts\.gstatic\.com|fonts\.googleapis\.com/i.test(source)) {
    throw new Error(`Remote font URL found in ${bundlePath}`);
  }
}

console.log(`Verified ${entries.length} files in ${path.basename(resolvedArchive)}.`);
