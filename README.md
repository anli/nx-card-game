# React Native Card Game

Card Game Mobile App build with [React Native](https://reactnative.dev/) and [NX monorepo](https://nx.dev/)

## Run the App

Install packages

```
npm ci
```

Run on Android

```
npm run android
```

Run on iOS

```
npm run ios
```

Run e2e tests with Detox

```
npm run start

# android
# update .env E2E_ANDROID_SIMULATOR with your emulator name
# in another terminal
npm run e2e-test-android

# ios needs signing certificate
# not working for now
npm run e2e-test-ios
```

Run unit tests

```
# run on all modules, and do not use caching
npm run test -- --all --skip-nx-cache
```

Run test coverage checks

```
npm run test-coverage

# open coverage report if needed
open coverage/combine-coverage/index.html
```

Run linting

```
# run on all modules, and do not use caching
npm run lint -- --all --skip-nx-cache
```

Run type checking

```
npm run type-check -- --all --skip-nx-cache
```

## Key File and Folder Architecture

```
.github                                 // CI scripts
apps
├──card-game-app
│   └──src
│      ├──app                           // portal app
│      └──screens
│         └──game-screen                // portal game
└──card-game-app-e2e
    └──src/app.spec.ts                  // e2e test files
coverage                                // unit test coverage files
libs
├──card-game                            // card game specific libraries
│  ├──feature
│  │    └──src/game                     // game business logics
│  ├──ui                                // game UI components
│  │  └──src
│  │      ├──flip-card
│  │      └──game-header
│  └──utils
│     └──src/get-random-number-pairs
└──shared                               // store reusable libraries across different scope
   ├──ui
   │  └──src
   │     ├──components                  // generic UI components
   │     ├──themes                      // theming files
   │     └──utils
   └──utils-testing                     // unit tests helpers
tools                                   // custom scripts
└──combine-coverage-final.js
.env                                    // environment variables
...
```

## Key Technology Stack or Libraries

- [NX monorepo](https://nx.dev/): Smart, Fast and Extensible Build System for monorepo
- [react native testing library](https://callstack.github.io/react-native-testing-library/): React Native testing utilities that encourage good testing practices
- [Typescript](https://www.typescriptlang.org/): Strongly typed programming language that builds on JavaScript
- [Standard JS](https://standardjs.com/): Enforce consistent style for code clarity and conventions
- [Restyle](https://github.com/Shopify/restyle): A type-enforced system for building UI components in React Native with TypeScript
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/docs/): Allows for creating smooth animations and interactions that runs on the UI thread.
- [why did you render](https://github.com/welldone-software/why-did-you-render): Detect potentially avoidable re-renders.
- [Sonar Cloud](https://sonarcloud.io/): Feedback on Code Quality and Code Security
- [Detox](https://github.com/wix/Detox): Gray box end-to-end testing and automation framework
