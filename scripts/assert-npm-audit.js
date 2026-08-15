#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const reportPath = process.argv[2];

if (!reportPath) {
  throw new Error('Usage: node scripts/assert-npm-audit.js <npm-audit.json>');
}

const report = JSON.parse(fs.readFileSync(path.resolve(reportPath), 'utf8'));

if (report.error || report.auditReportVersion !== 2 || !report.metadata?.vulnerabilities) {
  throw new Error(
    `npm audit did not return a valid audit report${
      report.error?.summary ? `: ${report.error.summary}` : ''
    }`,
  );
}

const vulnerabilities = report.vulnerabilities || {};
const counts = report.metadata?.vulnerabilities || {};
const allowedHighAdvisories = new Set([
  'GHSA-5p2g-fcmc-qvqq',
  'GHSA-w3rx-r6r6-pgpr',
]);

if ((counts.critical || 0) !== 0) {
  throw new Error(`npm audit reported ${counts.critical} Critical vulnerabilities`);
}

function findAdvisories(packageName, visited = new Set()) {
  if (visited.has(packageName)) {
    return [];
  }

  visited.add(packageName);
  const vulnerability = vulnerabilities[packageName];

  if (!vulnerability) {
    return [];
  }

  return (vulnerability.via || []).flatMap(cause => {
    if (typeof cause === 'string') {
      return findAdvisories(cause, visited);
    }

    if (cause.severity !== 'high' && cause.severity !== 'critical') {
      return [];
    }

    const advisoryId = cause.url?.split('/').pop();
    return advisoryId ? [advisoryId] : [];
  });
}

const highPackages = Object.entries(vulnerabilities)
  .filter(([, vulnerability]) => vulnerability.severity === 'high')
  .map(([packageName]) => packageName);
const observedAdvisories = new Set();

for (const packageName of highPackages) {
  const advisories = findAdvisories(packageName);

  if (advisories.length === 0) {
    throw new Error(`Could not resolve the High advisory behind ${packageName}`);
  }

  for (const advisory of advisories) {
    observedAdvisories.add(advisory);
  }
}

const unexpected = [...observedAdvisories].filter(
  advisory => !allowedHighAdvisories.has(advisory),
);

if (unexpected.length > 0) {
  throw new Error(`Unexpected High advisories: ${unexpected.sort().join(', ')}`);
}

console.log(
  `npm audit contains no Critical advisories and no unbaselined High advisories (${[
    ...observedAdvisories,
  ]
    .sort()
    .join(', ') || 'none'}).`,
);
