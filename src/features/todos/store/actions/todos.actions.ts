import { Action } from "@ngrx/store";
import { Todo } from "../../models/todo.model";

export const LOAD_TODOS = "[Todos] Load Todos";
export const LOAD_TODOS_FAIL = "[Todos] Load Todos Fail";
export const LOAD_TODOS_SUCCESS = "[Todos] Load Todos Success";

export class LoadTodosAction implements Action {
  readonly type = LOAD_TODOS;
}

export class LoadTodosFailAction implements Action {
  readonly type = LOAD_TODOS_FAIL;
}

export class LoadTodosSuccessAction implements Action {
  readonly type = LOAD_TODOS_SUCCESS;
  constructor(public payload: Todo[]) {}
}

export type TodoAction = LoadTodosAction | LoadTodosFailAction | LoadTodosSuccessAction;
