import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { TodoFormComponent } from './todo-form.component';
import { configureTestSuite } from '../../../../config/setupJest';

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;

  configureTestSuite();

  beforeAll((done) => (async () => {
    TestBed.configureTestingModule({
      declarations: [TodoFormComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });

    await TestBed.compileComponents();
  })().then(done).catch(done.fail));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  }));

  it('should render a form', () => {
    const todoForm = fixture.nativeElement.querySelectorAll('form');

    expect(todoForm.length).toEqual(1);
  });

  it('should listen to form changes', () => {
    console.log = jest.fn();
    component.todoForm.controls['text'].setValue('bl');
    expect(console.log).not.toBeCalled();
    jest.resetAllMocks();
    component.todoForm.controls['text'].setValue('bla');
    expect(console.log).toBeCalledWith('bla');
    jest.resetAllMocks();
    component.todoForm.controls['text'].setValue('blah');
    expect(console.log).toBeCalledWith('blah');
    jest.resetAllMocks();
    component.todoForm.controls['text'].setValue('');
    expect(console.log).not.toBeCalled();
  });

  it('should dispatch action on addTodo', (done) => {
    component.todoForm.controls['text'].setValue('blah');

    component.submitEmitter.subscribe((foo) => {
      expect(foo).toEqual({ text: 'blah' });
      done();
    });

    component.addTodo();
  });
});
