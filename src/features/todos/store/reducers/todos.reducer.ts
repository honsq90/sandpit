import { Todo } from "../../models/todo.model";

import * as fromActions from "../actions";
import { BrowserTransferStateModule } from "@angular/platform-browser";

export interface TodoState {
  todos: Todo[],
  loading: boolean,
  loaded: boolean,
}

const initialState: TodoState = {
  todos: [
    {text: 'hello'},
  ],
  loading: false,
  loaded: false,
}

export function reducer(state: TodoState = initialState, action: fromActions.TodoAction) {
  switch(action.type) {
    case fromActions.LOAD_TODOS: {
      return {
        ...state,
        loading: true,
      }
    }

    case fromActions.LOAD_TODOS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      }
    }

    case fromActions.LOAD_TODOS_SUCCESS: {
      return {
        ...state,
        todos: action.payload,
        loading: false,
        loaded: true,
      }
    }
  }
  return state;
}
