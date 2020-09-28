module.exports = {
  preset: "@vue/cli-plugin-unit-jest",

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^~/(.*)$": "<rootDir>/src/$1"
  },
  moduleFileExtensions: ["js", "vue", "json"],
  transform: {
    "^.+\\.js$": "babel-jest",
    ".*\\.(vue)$": "vue-jest"
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.vue",
    "!**/node_modules/**",
    "!**/dist/**",
    "!**/_first_version/**",
    "!**/coverage/**",
    "!babel.config.js",
    "!jest.config.js",
    "!vue.config.js"
  ]
};
