import * as fromFeature from "../reducers/";
import { createSelector } from "@ngrx/store";

export const getAllTodos = createSelector(fromFeature.getTodoState, state => state.list);
