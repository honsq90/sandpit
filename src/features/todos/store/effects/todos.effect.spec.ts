import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { cold, hot } from "jest-marbles";

import { Observable } from "rxjs";
import 'rxjs/add/observable/of';

import { TodosEffects } from "../effects";
import * as fromActions from "../actions";
import { TodosService } from "../../services";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe("TodosEffects", () => {
  let effects: TodosEffects;
  let actions: Observable<any>;

  const streamMock = Observable.of([{ text: "hi" }]);
  const serviceMock = {
    getTodos: jest.fn().mockReturnValue(streamMock)
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        TodosEffects,
        { provide: TodosService, useValue: serviceMock },
        provideMockActions(() => actions),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    effects = TestBed.get(TodosEffects);
  });

  it("should work", () => {
    const action = new fromActions.LoadTodosAction();
    const completion = new fromActions.LoadTodosSuccessAction([{ text: "hi" }]);

    // Refer to 'Writing Marble Tests' for details on '--a-' syntax
    actions = hot("--a-", { a: action });
    const expected = cold("--b", { b: completion });

    expect(effects.loadTodos$).toBeObservable(expected);
  });
});
