import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { TodosComponent } from './todos.component';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodosComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should render a list of todos', () => {
  //   component.todos = [
  //     {text: 'hello'},
  //     {text: 'hello2'},
  //   ]
  //   fixture.detectChanges();

  //   const s = fixture.debugElement.nativeElement;
  //   const todos = s.querySelectorAll("li");

  //   expect(todos.length).toEqual(2);
  //   expect(todos[0].innerHTML).toEqual("hello");
  //   expect(todos[1].innerHTML).toEqual("hello2");
  // });

  // it('should add todos', () => {

  //   fixture.detectChanges();

  //   const s = fixture.debugElement.nativeElement;

  //   component.todoForm.controls['text'].setValue('blah');

  //   component.addTodo();

  //   fixture.detectChanges();
  //   expect(component.todos.length).toEqual(1);
  //   expect(component.todos[0]).toEqual({text: 'blah'});

  // });
});
