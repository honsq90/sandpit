import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from "@ngrx/store";

import * as fromTodos from "./todos.reducer";

export const TODO_FEATURE = "todoFeature";

export interface FeatureState {
  fromTodos: fromTodos.TodoState;
}

export const reducers: ActionReducerMap<FeatureState> = {
  fromTodos: fromTodos.reducer
};

export const getFeatureState = createFeatureSelector<FeatureState>(
  TODO_FEATURE
);

export const getTodoState = createSelector(
  getFeatureState,
  (state: FeatureState) => state.fromTodos
);
