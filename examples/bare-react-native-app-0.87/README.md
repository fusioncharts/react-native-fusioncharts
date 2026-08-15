# Bare React Native example

This source-only example targets React Native 0.87.0 and installs the wrapper
from the repository root. It was generated with the official React Native
Community CLI. Generated build outputs, Pods, Gradle caches, and vendored gems
must not be committed.

Follow React Native's [environment setup](https://reactnative.dev/docs/set-up-your-environment),
then run:

```sh
npm ci
npm run android
# or
cd ios && bundle install && bundle exec pod install && cd .. && npm run ios
```

The chart uses only bundled FusionCharts assets. Exporting a chart uses the
native share sheet and saves image formats to the camera roll after permission
is granted.
