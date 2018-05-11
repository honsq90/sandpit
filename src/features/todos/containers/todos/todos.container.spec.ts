import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { DebugElement, NO_ERRORS_SCHEMA } from "@angular/core";
import { StoreModule, Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";

import * as fromStore from "../../store";
import { TodosContainer } from "./todos.container";
import { By } from "@angular/platform-browser";

describe("TodosContainer", () => {
  let component: TodosContainer;
  let fixture: ComponentFixture<TodosContainer>;
  let page: Page;

  const todos = [{ text: "blah" }];
  const streamMock = Observable.of(todos);
  const storeMock = {
    select: jest.fn().mockReturnValue(streamMock),
    dispatch: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodosContainer],
      providers: [{ provide: Store, useValue: storeMock }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TodosContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
    page = new Page(fixture);
  });

  it("should receive todo stream from store", () => {
    expect(storeMock.select).toHaveBeenCalledWith(fromStore.getAllTodos);
    expect(component.todos$).toEqual(streamMock);
  });

  it("should render todo-list and todo-form with the appropriate properties", () => {
    const s = fixture.debugElement.nativeElement;
    const todoList = s.querySelector("todo-list");
    const todoForm = s.querySelector("app-todo-form");
    const payload = { text: "hello" };

    page.todoForm.listeners[0].callback(payload);
    expect(todoList.todos).toEqual(todos);
    expect(storeMock.dispatch).toBeCalledWith(
      new fromStore.AddTodoAction(payload),
    );
  });
});

class Page {
  todoForm: DebugElement;
  constructor(fixture) {
    this.todoForm = fixture.debugElement.query(By.css("app-todo-form"));
  }
}
