import * as fromFeature from "../reducers/";
import { createSelector } from "@ngrx/store";

export const getTodoState = createSelector(
  fromFeature.getFeatureState,
  (state: fromFeature.FeatureState) => state.todos
);

export const getAllTodos = createSelector(getTodoState, state => state.todos);
