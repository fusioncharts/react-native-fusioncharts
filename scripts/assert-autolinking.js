#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const configPath = process.argv[2];
const requestedPlatform = process.argv[3] || 'both';

if (!configPath) {
  throw new Error(
    'Usage: node scripts/assert-autolinking.js <react-native-config.json> [android|ios|both]',
  );
}

if (!['android', 'ios', 'both'].includes(requestedPlatform)) {
  throw new Error(`Unsupported platform selection: ${requestedPlatform}`);
}

const config = JSON.parse(fs.readFileSync(path.resolve(configPath), 'utf8'));
const requiredDependencies = [
  '@dr.pogodin/react-native-fs',
  '@notifee/react-native',
  '@react-native-camera-roll/camera-roll',
  'react-native-share',
  'react-native-webview',
];

for (const dependencyName of requiredDependencies) {
  const dependency = config.dependencies?.[dependencyName];

  if (!dependency) {
    throw new Error(`${dependencyName} is missing from React Native autolinking output`);
  }

  const platforms =
    requestedPlatform === 'both' ? ['android', 'ios'] : [requestedPlatform];

  for (const platform of platforms) {
    if (!dependency.platforms?.[platform]) {
      throw new Error(`${dependencyName} is not configured for ${platform}`);
    }
  }
}

console.log(
  `Verified ${requestedPlatform} autolinking for ${requiredDependencies.length} native dependencies.`,
);
