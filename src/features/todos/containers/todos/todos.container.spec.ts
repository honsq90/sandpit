import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import { TodosContainerComponent } from './todos.container';
import { By } from '@angular/platform-browser';
import { MockStore } from '@spec_helpers/mock-store';
import * as todosSelectors from '../../store/selectors/todos.selectors';

class Container {
  todoForm: DebugElement;
  constructor(fixture) {
    this.todoForm = fixture.debugElement.query(By.css('app-todo-form'));
  }
}

describe('TodosContainer', () => {
  let component: TodosContainerComponent;
  let fixture: ComponentFixture<TodosContainerComponent>;
  let container: Container;

  const todos = [{ text: 'blah' }];
  const storeMock = new MockStore(todosSelectors);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodosContainerComponent],
      providers: [{ provide: Store, useValue: storeMock }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    jest.spyOn(storeMock, 'select');
    jest.spyOn(storeMock, 'dispatch');

    fixture = TestBed.createComponent(TodosContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    container = new Container(fixture);
  });

  it('should receive todo stream from store', () => {
    expect(storeMock.select).toHaveBeenCalledWith(todosSelectors.getAllTodos);
    expect(component.todos$).toEqual(storeMock.selectStreams['getAllTodos']);
  });

  it('should render todo-list and todo-form with the appropriate properties', () => {
    const s = fixture.debugElement.nativeElement;
    const todoList = s.querySelector('app-todo-list');
    const payload = { text: 'hello' };

    expect(todoList.todos).toEqual(null);

    storeMock.selectStreams['getAllTodos'].next(todos);
    fixture.detectChanges();

    expect(todoList.todos).toEqual(todos);

    container.todoForm.listeners[0].callback(payload);
    expect(storeMock.dispatch).toBeCalledWith(new fromStore.AddTodoAction(payload));
  });
});
