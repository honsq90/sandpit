import { Todo } from '../../models/todo.model';

import * as fromActions from '../actions';

export interface TodoState {
  list: Todo[];
  loading: boolean;
  loaded: boolean;
}

const initialState: TodoState = {
  list: [],
  loading: false,
  loaded: false,
};

export function reducer(state: TodoState = initialState, action: fromActions.TodoAction): TodoState {
  switch (action.type) {
    case fromActions.LOAD_TODOS: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromActions.LOAD_TODOS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }

    case fromActions.LOAD_TODOS_SUCCESS: {
      return {
        ...state,
        list: action.payload,
        loading: false,
        loaded: true,
      };
    }

    case fromActions.ADD_TODO: {
      return {
        ...state,
        list: [
          ...state.list,
          action.payload,
        ],
      };
    }
  }
  return state;
}
