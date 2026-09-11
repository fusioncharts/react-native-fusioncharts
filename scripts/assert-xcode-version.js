#!/usr/bin/env node

const {execFileSync} = require('child_process');

const minimum = (process.argv[2] || '26.4').split('.').map(Number);
const output = execFileSync('xcodebuild', ['-version'], {encoding: 'utf8'});
const match = output.match(/^Xcode (\d+)\.(\d+)/m);

if (!match) {
  throw new Error(`Could not parse Xcode version from:\n${output}`);
}

const installed = [Number(match[1]), Number(match[2])];
const supported =
  installed[0] > minimum[0] ||
  (installed[0] === minimum[0] && installed[1] >= minimum[1]);

if (!supported) {
  throw new Error(
    `Xcode ${minimum.join('.')} or newer is required; found ${installed.join('.')}`,
  );
}

console.log(output.trim());
console.log(`Xcode ${installed.join('.')} satisfies the ${minimum.join('.')} minimum.`);
