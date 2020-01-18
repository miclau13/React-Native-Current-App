module.exports = {
  preset: "jest-expo",
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base)"
  ],
  // testEnvironment: 'node',
  moduleFileExtensions: ["js","ts","tsx"],
  // transform: {
  //   "^.+\\.(ts|tsx)$": "./node_modules/ts-jest/preprocessor.js"
  // },
  // testMatch: [
  //   "**/__test__/**/*.test.(ts|js)"
  // ],
  // transform: {
  //   '^.+\\.ts?$': 'ts-jest',
  // },
  // transform: {
  //   '\\.js$': './node_modules/ts-jest/preprocessor.js',
  // }
};