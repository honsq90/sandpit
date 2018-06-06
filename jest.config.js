module.exports = {
  globals: {
    '__TS_CONFIG__': {
      'target': 'es6',
      'module': 'commonjs',
      'moduleResolution': 'node'
    },
    'ts-jest': {
      'tsConfigFile': 'src/tsconfig.spec.json'
    },
    '__TRANSFORM_HTML__': true
  },
  testRegex: '\\.spec\\.ts$',
  setupTestFrameworkScriptFile: '<rootDir>/src/config/setupJest.ts',
  transform: {
    '^.+\\.(ts|html)$': '<rootDir>/node_modules/jest-preset-angular/preprocessor.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!@ngrx)'
  ],
  collectCoverageFrom: [
    'src/**/*.{ts}',
    '!src/config/**/*.{ts}',
    '!src/**/index.ts',
    '!src/**/*.{js}',
    '!src/**/*.module.{ts}',
    '!src/**/*.interface.{ts}',
    '!src/**/*.state.{ts}',
    '!src/**/*.entity.{ts}'
  ],
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'json'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    'src/app/*.{js}'
  ],
  moduleNameMapper: {
    "@app/(.*)": "<rootDir>/src/app/$1",
    "@spec_helpers/(.*)": "<rootDir>/src/spec_helpers/$1",
  }
};
