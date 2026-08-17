#!/usr/bin/env node

/**
 * Pre-publish gate. Runs from `prepublishOnly`, so it is the last thing that
 * happens before an immutable artifact reaches the registry.
 *
 * It checks the four things that cannot be undone once published:
 *   1. a prerelease version is not about to be published as `latest`
 *   2. the inlined FusionCharts bundle in the tree is reproducible from source
 *      (nothing else in the publish path re-derives this 5 MB generated asset)
 *   3. the packed archive contains exactly the expected files, at the expected
 *      version, with no remote font URLs (scripts/audit-package.js)
 *   4. the unit tests pass
 *
 * Run directly with `npm run verify:package` to check without publishing.
 */

const {execFileSync} = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const root = path.resolve(__dirname, '..');
const run = (command, args, options = {}) =>
  execFileSync(command, args, {cwd: root, encoding: 'utf8', ...options});

const step = message => console.log(`\nverify:package - ${message}`);

// A publish gate should explain itself, not print a Node stack trace over the
// explanation. Anything thrown below surfaces as its message alone.
class VerificationError extends Error {}

process.on('uncaughtException', error => {
  if (error instanceof VerificationError) {
    console.error(`\nverify:package FAILED\n\n${error.message}\n`);
    process.exit(1);
  }

  throw error;
});

const {version} = JSON.parse(
  fs.readFileSync(path.join(root, 'package.json'), 'utf8'),
);

// 1. dist-tag guard.
//
// npm publishes to `latest` by default REGARDLESS of a prerelease identifier
// in the version - it infers nothing from `-rc.0`. This package's history
// already contains 6.0.0-beta.1, 6.0.0-beta.2 and 6.0.1-beta.1, and its
// dist-tags today list only `latest`, so those prereleases were served to
// every plain `npm i` while they were current. Do not repeat that.
const isPrerelease = version.includes('-');
const tag = process.env.npm_config_tag;

step(`version ${version}${isPrerelease ? ' (prerelease)' : ''}, tag ${tag || '(default: latest)'}`);

if (isPrerelease && (!tag || tag === 'latest')) {
  throw new VerificationError(
    `Refusing to publish prerelease ${version} to the "latest" dist-tag.\n` +
      'A plain `npm i react-native-fusioncharts` would start serving this build.\n' +
      'Publish with an explicit tag instead, e.g.:\n\n' +
      '    npm publish --tag rc\n',
  );
}

if (!isPrerelease && tag && tag !== 'latest') {
  console.warn(
    `warning: stable version ${version} is being published to "${tag}", not "latest".`,
  );
}

// 2. The generated bundle must be reproducible from source.
//
// src/modules/{layout,modules,scripts}.js and the .fcscript payload are
// generated artifacts that are committed to the repo. Without this check a
// stale or hand-edited bundle ships silently.
step('rebuilding the inlined FusionCharts bundle');
run('npm', ['run', 'build:FC'], {stdio: 'inherit'});

step('checking the rebuilt bundle matches what is committed');
try {
  run('git', ['diff', '--exit-code', '--', 'src/modules']);
} catch {
  throw new VerificationError(
    'The committed FusionCharts bundle does not match a fresh build:FC.\n' +
      'Run `npm run build:FC`, review `git diff -- src/modules`, and commit\n' +
      'the result before publishing so the artifact matches reviewable source.',
  );
}

// 3. Audit the archive npm is about to publish.
//
// `npm pack` triggers prepack/postpack, not prepublishOnly, so this does not
// recurse.
step('packing and auditing the release archive');
const packDir = fs.mkdtempSync(path.join(os.tmpdir(), 'rnfc-verify-'));

// `npm publish --dry-run` exports npm_config_dry_run=true into the lifecycle
// environment, which a nested `npm pack` inherits - it would then print a
// filename without writing the file, and the audit below would stat a path
// that does not exist. Strip it so the archive is always really produced and
// the audit runs identically whether or not this is a rehearsal.
const packEnv = {...process.env};
delete packEnv.npm_config_dry_run;

try {
  const packOutput = run(
    'npm',
    ['pack', '--pack-destination', packDir, '--silent'],
    {env: packEnv},
  );
  // Take the last non-empty line: npm may prepend notices even under --silent.
  const archiveName = packOutput.trim().split('\n').pop().trim();
  const archivePath = path.join(packDir, archiveName);

  if (!fs.existsSync(archivePath)) {
    throw new VerificationError(
      `npm pack reported "${archiveName}" but wrote nothing to ${packDir}.\n` +
        'If this ran under a dry run, the npm_config_dry_run strip above failed.',
    );
  }

  run('node', [path.join('scripts', 'audit-package.js'), archivePath], {
    stdio: 'inherit',
  });
} catch (error) {
  if (error instanceof VerificationError) {
    throw error;
  }

  throw new VerificationError(
    `Packing or auditing the release archive failed.\n${error.message}`,
  );
} finally {
  fs.rmSync(packDir, {recursive: true, force: true});
}

// 4. Unit tests.
step('running unit tests');
run('npm', ['test'], {stdio: 'inherit'});

console.log(`\nverify:package - OK, ${version} is ready to publish.`);
