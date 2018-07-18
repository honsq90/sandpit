import * as todoReducer from './todos.reducer';
import * as todoActions from '../actions/todos.actions';
import { Todo } from '../../models/todo.model';

describe('Todos Selectors', () => {

  it('should set loading to true on LOAD_TODOS', () => {
    const reducedState = todoReducer.reducer(undefined, new todoActions.LoadTodosAction('hi'));
    const expectedState: todoReducer.TodoState = {list: [], loaded: false, loading: true};
    expect(reducedState).toEqual(expectedState);
  });

  it('should set list on LOAD_TODOS_SUCCESS', () => {
    const todo: Todo = { text: 'hello' };
    const initialState: todoReducer.TodoState = {list: [], loaded: false, loading: true};
    const reducedState = todoReducer.reducer(initialState, new todoActions.LoadTodosSuccessAction([todo]));
    const expectedState: todoReducer.TodoState = {list: [todo], loaded: true, loading: false};
    expect(reducedState).toEqual(expectedState);
  });

  it('should reset list on LOAD_TODOS_FAIL', () => {
    const todo: Todo = { text: 'hello' };
    const initialState: todoReducer.TodoState = {list: [todo], loaded: false, loading: true};
    const reducedState = todoReducer.reducer(initialState, new todoActions.LoadTodosFailAction('blah'));
    const expectedState: todoReducer.TodoState = {list: [todo], loaded: false, loading: false};
    expect(reducedState).toEqual(expectedState);
  });

  it('should add todo to list on ADD_TODO', () => {
    const todo: Todo = { text: 'hello' };
    const initialState: todoReducer.TodoState = {list: [], loaded: false, loading: false};
    const reducedState = todoReducer.reducer(initialState, new todoActions.AddTodoAction(todo));
    const expectedState: todoReducer.TodoState = {list: [todo], loaded: false, loading: false};
    expect(reducedState).toEqual(expectedState);
  });
});
