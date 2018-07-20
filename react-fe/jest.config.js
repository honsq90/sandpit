module.exports = {
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "<rootDir>/config/test-preprocessor.js"
  },
  "testMatch": [
    "**/*.spec.(ts|tsx)"
  ]
}