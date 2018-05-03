import * as fromFeature from "../reducers/";
import { createSelector, createFeatureSelector } from "@ngrx/store";

export const getFeatureState = createFeatureSelector<fromFeature.FeatureState>(
  fromFeature.TODO_FEATURE
);

export const getTodoState = createSelector(
  getFeatureState,
  (state: fromFeature.FeatureState) => state.fromTodos
);

export const getAllTodos = createSelector(getTodoState, state => state.list);

