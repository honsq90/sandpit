import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";

import * as fromTodos from "./todos.reducer"

export interface FeatureState {
  todos: fromTodos.TodoState;
}

export const reducers: ActionReducerMap<FeatureState> = {
  todos: fromTodos.reducer,
};

export const getFeatureState = createFeatureSelector<FeatureState>(
  'todos'
);
