import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoListComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render a list of todos', () => {
    component.todos = [
      {text: 'hello'},
      {text: 'hello2'},
    ];
    fixture.detectChanges();

    const s = fixture.debugElement.nativeElement;
    const todos = s.querySelectorAll('li');

    expect(todos.length).toEqual(2);
    expect(todos[0].innerHTML).toEqual('hello');
    expect(todos[1].innerHTML).toEqual('hello2');
  });

});
