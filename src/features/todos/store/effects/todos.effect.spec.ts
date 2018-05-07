import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { cold, hot } from "jest-marbles";

import { Observable } from "rxjs";
import "rxjs/add/observable/of";

import { TodosEffects } from "../effects";
import * as fromActions from "../actions";
import { TodosService } from "../../services";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { Todo } from "../../models/todo.model";

describe("TodosEffects", () => {
  let effects: TodosEffects;
  let actions: Observable<any>;
  let getTodosMock: Observable<Todo[]>;

  const serviceMock = {
    getTodos: jest.fn(),
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

    actions = hot("a---", { a: action });
    getTodosMock = cold("---t", { t: [{ text: "hi" }] });
    const expected = cold("---b", { b: completion });

    serviceMock.getTodos.mockReturnValue(getTodosMock);

    expect(effects.loadTodos$).toBeObservable(expected);
  });

  it("should catch error", () => {
    const error = "failed!";
    const action = new fromActions.LoadTodosAction();
    const completion = new fromActions.LoadTodosFailAction(error);

    actions = hot("a---", { a: action });
    getTodosMock = cold("--#|", {}, error);
    const expected = cold("--e", { e: completion });

    serviceMock.getTodos.mockReturnValue(getTodosMock);

    expect(effects.loadTodos$).toBeObservable(expected);
  });
});
