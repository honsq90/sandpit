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
  const t = [{ text: "hi" }];
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

  describe("#loadTodos$", () => {
    it("should not duplicate server queries", () => {
      const action = new fromActions.LoadTodosAction("hi");
      const completion = new fromActions.LoadTodosSuccessAction(t);

      actions =         hot("aaaaa", { a: action });
      getTodosMock =   cold("--t", { t });
      const expected = cold("--b", { b: completion });

      serviceMock.getTodos.mockReturnValue(getTodosMock);

      expect(effects.loadTodos$).toBeObservable(expected);
    });

    it("should only query again if value has changed", () => {
      const action = new fromActions.LoadTodosAction("hi");
      const actionB = new fromActions.LoadTodosAction("hi2");
      const completion = new fromActions.LoadTodosSuccessAction(t);

      actions =         hot("aaaaab", { a: action, b: actionB });
      getTodosMock =   cold("--t", { t });
      const expected = cold("--b----b", { b: completion });

      serviceMock.getTodos.mockReturnValue(getTodosMock);

      expect(effects.loadTodos$).toBeObservable(expected);
    });

    it("should catch error after 3 tries", () => {
      const error = "failed!";
      const action = new fromActions.LoadTodosAction("hi");
      const completion = new fromActions.LoadTodosFailAction(error);

      actions =              hot("a", { a: action });
      const getTodosError = cold("--#", {}, error);
      const expected =      cold("------e", { e: completion });
      serviceMock.getTodos.mockReturnValue(getTodosError);

      expect(effects.loadTodos$).toBeObservable(expected);
    });
  })

});
