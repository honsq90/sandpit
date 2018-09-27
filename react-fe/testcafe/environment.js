const minimist = require('minimist')

const arguments = minimist(process.argv)

exports.hostUrl = arguments['host'] ? arguments['host'] : `http://localhost:1234`
exports.environment = arguments['host'] ? 'integrated' : 'local'

exports.test = arguments['test'] ? arguments['test'] : '*'
exports.debug = arguments['debug'] ? !!arguments['debug'] : false
exports.browsers = arguments['browsers'] ? arguments['browsers'].split(',') : 'chrome:headless --no-sandbox'
exports.concurrency = arguments['concurrency'] ? arguments['concurrency'] : 1

console.log(`Environment: ${exports.hostUrl}`)
console.log(`Proxy: ${exports.proxy ? exports.proxy : 'none configured'}`)
console.log(`Test case: ${exports.test ? exports.test : 'All tests'}`)
console.log(`DebugOnFail: ${exports.debug ? 'Yes' : 'No'}`)
console.log(`Browsers: ${exports.browsers}`)
