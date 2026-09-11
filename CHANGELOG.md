# Changelog

## 7.0.0

### Added

- Support for React Native 0.75 through 0.87 and the corresponding React 18/19
  release train.
- Clean-consumer compatibility and native-build CI for every supported React
  Native minor, with deep Android/iOS lanes and an Expo development-build lane.
- A consumer application per supported React Native minor and per stable Expo
  SDK pairing, each installing the published archive and verified by a rendered
  chart on an Android emulator and an iOS simulator.
- Local WebView export capture for JPEG, PNG, SVG, PDF, CSV, and XLSX files.
- Offline FusionCharts theme fonts with license and provenance records.

### Changed

- Replaced the legacy filesystem dependency with
  an RN-versioned `@dr.pogodin/react-native-fs` native peer for New
  Architecture compatibility across changing React Native codegen generations.
- Updated the native dependency set, FusionCharts to 4.2.2, React Native test
  infrastructure, and the bare/Expo example applications.
- Restricted WebView network and form behavior with a content security policy
  and validated bridge messages.

### Security

- Addressed known OSV advisories in the dependency graph.
- Updated the inlined jsPDF in the shipped bundle from 3.0.2 to 4.2.1, which
  clears two Critical advisories reachable through chart export.

## 6.x and earlier

See the [release history](https://github.com/fusioncharts/react-native-fusioncharts/releases) for versions 1.0.0 through 6.0.1.
