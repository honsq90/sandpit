import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import * as fromStore from '../../store';
import { TodosContainerComponent } from './todos.container';
import { By } from '@angular/platform-browser';

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
  const streamMock = Observable.of(todos);
  const storeMock = {
    select: jest.fn().mockReturnValue(streamMock),
    dispatch: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodosContainerComponent],
      providers: [{ provide: Store, useValue: storeMock }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TodosContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    container = new Container(fixture);
  });

  it('should receive todo stream from store', () => {
    expect(storeMock.select).toHaveBeenCalledWith(fromStore.getAllTodos);
    expect(component.todos$).toEqual(streamMock);
  });

  it('should render todo-list and todo-form with the appropriate properties', () => {
    const s = fixture.debugElement.nativeElement;
    const todoList = s.querySelector('todo-list');
    const payload = { text: 'hello' };

    container.todoForm.listeners[0].callback(payload);
    expect(todoList.todos).toEqual(todos);
    expect(storeMock.dispatch).toBeCalledWith(
      new fromStore.AddTodoAction(payload),
    );
  });
});
