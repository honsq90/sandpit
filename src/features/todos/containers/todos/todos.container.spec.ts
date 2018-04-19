import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { DebugElement, NO_ERRORS_SCHEMA } from "@angular/core";
import { StoreModule, Store } from "@ngrx/store";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import * as fromStore from "../../store";
import { TodosContainer } from "./todos.container";

describe("TodosContainer", () => {
  let component: TodosContainer;
  let fixture: ComponentFixture<TodosContainer>;

  const streamMock = Observable.of([]);
  const storeMock = {
    select: jest.fn().mockReturnValue(streamMock)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodosContainer],
      providers: [{ provide: Store, useValue: storeMock }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should receive todo stream from store", () => {
    expect(storeMock.select).toHaveBeenCalledWith(fromStore.getAllTodos)
    expect(component.todos$).toEqual(streamMock);
  });

  it("should render todo-list and todo-form", () => {
    const s = fixture.debugElement.nativeElement;
    const todoList = s.querySelectorAll("todo-list");
    const todoForm = s.querySelectorAll("todo-form");

    expect(todoList.length).toEqual(1);
    expect(todoForm.length).toEqual(1);
  });
});
