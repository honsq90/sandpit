const { defaults } = require('jest-config');
module.exports = {
  // ...
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  // ...
  setupTestFrameworkScriptFile: "<rootDir>/config/setupJest.js",
  transform: {
    "^.+\\.(ts|tsx)$": "<rootDir>/config/test-preprocessor.js"
  },
  testRegex: '\\.spec\\.(ts|tsx)$',
  collectCoverageFrom: [
    'src/**/*.{ts|tsx}',
    '!src/index.tsx',
  ],
};
