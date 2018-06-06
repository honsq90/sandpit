import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

interface SelectorMap {
  [key: string]: Function;
}

interface SubjectMap {
  [key: string]: Subject<any>;
}

export class MockStoreWithSubjects {
  public subjects: SubjectMap = {};

  constructor(private selectors: SelectorMap) { }

  public reset() {
    Object.values(this.subjects).map((subject) => subject.complete());
    this.subjects = {};
    this.selectors = {};
  }

  public dispatch(obj) { }

  public select(selector): Observable<any> {
    const selectKey = getKeyByValue(this.selectors, selector);
    if (!this.subjects[selectKey]) {
      this.subjects[selectKey] = new Subject();
    }
    return this.subjects[selectKey];
  }
}

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}
