import * as todoSelectors from './todos.selectors';
import { TodoState } from '../reducers/todos.reducer';

describe('Todos Selectors', () => {
  const todos: TodoState = {
    list: [{ text: 'hello' }],
    loading: false,
    loaded: false
  };

  it('should retrieve the todo list from state', () => {
    expect(todoSelectors.getAllTodos.projector(todos)).toEqual([
      { text: 'hello' }
    ]);
  });
});
