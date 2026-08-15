#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const buildFile = process.argv[2];
const requestedMinimum = Number(process.argv[3] || 24);

if (!buildFile || !Number.isInteger(requestedMinimum)) {
  throw new Error(
    'Usage: node scripts/configure-android-min-sdk.js <android/build.gradle> <minimum>',
  );
}

const resolvedBuildFile = path.resolve(buildFile);
const source = fs.readFileSync(resolvedBuildFile, 'utf8');
const pattern = /minSdkVersion\s*=\s*(\d+)/g;
const matches = [...source.matchAll(pattern)];

if (matches.length !== 1) {
  throw new Error(
    `Expected one minSdkVersion declaration in ${resolvedBuildFile}; found ${matches.length}`,
  );
}

const currentMinimum = Number(matches[0][1]);

if (currentMinimum >= requestedMinimum) {
  console.log(`Android minSdkVersion ${currentMinimum} already satisfies ${requestedMinimum}.`);
  process.exit(0);
}

const updated = source.replace(
  pattern,
  `minSdkVersion = ${requestedMinimum}`,
);
fs.writeFileSync(resolvedBuildFile, updated);
console.log(
  `Raised Android minSdkVersion from ${currentMinimum} to ${requestedMinimum}.`,
);
