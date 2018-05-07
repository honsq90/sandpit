import { Action } from "@ngrx/store";
import { Todo } from "../../models/todo.model";

export const LOAD_TODOS = "[Todos] Load Todos";
export const LOAD_TODOS_FAIL = "[Todos] Load Todos Fail";
export const LOAD_TODOS_SUCCESS = "[Todos] Load Todos Success";
export const ADD_TODO = "[Todos] Add Todo";

export class LoadTodosAction implements Action {
  readonly type = LOAD_TODOS;
}

export class LoadTodosFailAction implements Action {
  readonly type = LOAD_TODOS_FAIL;
  constructor(public error: any) {}
}

export class LoadTodosSuccessAction implements Action {
  readonly type = LOAD_TODOS_SUCCESS;
  constructor(public payload: Todo[]) {}
}

export class AddTodoAction implements Action {
  readonly type = ADD_TODO;
  constructor(public payload: Todo) {}
}

export type TodoAction =
  | LoadTodosAction
  | LoadTodosFailAction
  | LoadTodosSuccessAction
  | AddTodoAction;
