import * as fromStore from "../../store";
import * as todoSelectors from "./todos.selectors";
import { TodoState } from "../reducers/todos.reducer";
import { FeatureState, TODO_FEATURE } from "../../store";

describe("Todos Selectors", () => {
  const todos: TodoState = {
    list: [{ text: "hello" }],
    loading: false,
    loaded: false
  };

  const mockFeatureState: FeatureState = {
    fromTodos: todos
  };

  const mockState = {
    [TODO_FEATURE]: mockFeatureState
  };

  it("should receive todo stream from store", () => {
    expect(todoSelectors.getAllTodos(mockState)).toEqual([
      { text: "hello" }
    ]);
  });
});
