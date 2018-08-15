
## Libraries

* [React 16](https://reactjs.org/)
* [Typescript](https://www.typescriptlang.org/)
* [Parceljs](https://parceljs.org/): Lightweight replacement for Webpack
* [TestCafe](https://github.com/DevExpress/testcafe): Non Selenium based Functional Testing Framework
* [helpful-decorators](https://github.com/NetanelBasal/helpful-decorators): Convenience methods for Typescript

## Links

* [React + Parcel + Typescript starter](https://github.com/adhrinae/ts-react-parcel)

## Why TestCafe?

difference in architecture:
- selenium not designed for single page applications. uses remote web driver calls leading to flaky issues during dom renders and driver call dropouts
- works great in bamboo, just need headless chrome installed and proxy configured.
- no need to set up selenium webdriver

outcomes we wanted:
- small team
- cross browser issues less of a problem these days with the help of webpack/babel/polyfills.
- browsers becoming more consistent, IE support dwindling.
- effort/value ratio is not ideal to maintain and monitor automated visual regression suites
- css issues can be reviewed manually and detected as development time. can be assisted with stylelint and caniuse.com


cypress 
100mb binary electron app
chrome only
does video recordings for free
opinionated against page objects
Firefox incoming


testcafe
just npm install
just javascript
Can use TypeScript
free to structure your code in the way you like
Can use page objects
Can easily run against all browsers locally to verify functionality
supports parallel testing
test zero downtime

