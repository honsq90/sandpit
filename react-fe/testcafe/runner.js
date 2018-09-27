const createTestCafe = require("testcafe");
const glob = require("glob");
const fs = require("fs");
const environment = require('./environment');
const chalk = require("chalk");
const request = require("request");

request(environment.hostUrl, {}, (err, res, body) => {
    if (err || res.statusCode >= 400) {
        console.error(chalk.red(`Cannot access ${environment.hostUrl}.`));
        console.error(chalk.red(err || body));
        process.exit(1)
    }
});

const stream = fs.createWriteStream(`test-reports/junit-testcafe.xml`);

let runner = null;
let testcafe = null;

const getTests = () => {
    return new Promise(resolve => {
        console.log(`Getting tests matching ${`./testcafe/tests/*${environment.test}*.spec.ts`}`)
        glob(`./testcafe/tests/**/${environment.test}.spec.ts`, (er, files) => resolve(files));
    });
};

createTestCafe("localhost")
    .then(tc => {
        testcafe = tc;
        runner = testcafe.createRunner();
        return getTests();
    })
    .then(files => {
        return runner
            .src(files)
            .browsers(environment.browsers)
            .concurrency(environment.concurrency)
            .reporter('spec')
            .reporter('xunit', stream)
            .screenshots(`test-reports/screenshots/`, true)
            .run({
                debugOnFail: environment.debug,
            });
    })
    .then(failedCount => {
        console.log("Tests failed: " + failedCount);
        stream.end();
        testcafe.close();
        process.exit(failedCount > 0 ? 1 : 0);
    })
    .catch(error => {
        console.error(chalk.red("Error: " + error));
        stream.end();
        testcafe.close();
        process.exit(2);
    });