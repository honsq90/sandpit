# Angular 6 + RxJS + Typescript

### Libraries Used

* Angular 6 (upgraded from Angular 5)
* RxJS 6
* [Jest](https://facebook.github.io/jest)
* [Bulma - Flex based CSS framework](https://bulma.io/)
* [rxjs-marbles](https://github.com/cartant/rxjs-marbles) for [marble testing](https://github.com/ReactiveX/rxjs/blob/master/doc/marble-testing.md)

### Noteworthy items

* Shallow testing using `NO_ERRORS_SCHEMA`, in the spirit of [Enzyme](http://airbnb.io/enzyme/)
* MockStore for use with testing containers. See [MockStore](src/spec_helpers/mock-store.ts) and [how to use it in a container test](src/features/todos/containers/todos/todos.container.spec.ts)
* Reducing redundant TestBed configuration based on instructions from [Angular Unit Testing Performance](https://blog.angularindepth.com/angular-unit-testing-performance-34363b7345ba)

### Resources along the way

* [Angular + Jest](https://blog.cloudboost.io/angular-jest-wallabyjs-why-it-is-the-ideal-combination-and-how-to-configure-b4cbe2eff4b3)
* [ngrx Store + Effects tutorials](https://www.youtube.com/playlist?list=PLW2eQOsUPlWJRfWGOi9gZdc3rE4Fke0Wv)
* [Pending Issues around official Mock Store](https://github.com/ngrx/platform/issues/915)
