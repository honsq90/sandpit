import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

interface SelectorMap {
  [key: string]: Function;
}

interface SubjectMap {
  [key: string]: Subject<any>;
}

export class MockStore {
  public selectStreams: SubjectMap = {};

  constructor(private selectors: SelectorMap) { }

  public reset() {
    Object.values(this.selectStreams).map((subject) => subject.complete());
    this.selectStreams = {};
    this.selectors = {};
  }

  public dispatch(obj) { }

  public select(selector): Observable<any> {
    const selectKey = getKeyByValue(this.selectors, selector);
    if (!this.selectStreams[selectKey]) {
      this.selectStreams[selectKey] = new Subject();
    }
    return this.selectStreams[selectKey];
  }
}

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}
