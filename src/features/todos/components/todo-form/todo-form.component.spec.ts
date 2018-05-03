import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { DebugElement, NO_ERRORS_SCHEMA } from "@angular/core";

import { TodoFormComponent } from "./todo-form.component";
import { AddTodoAction } from "../../store";
import { Store } from "@ngrx/store";

describe("TodoFormComponent", () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;

  const storeMock = {
    dispatch: jest.fn(),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoFormComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: Store, useValue: storeMock }],
    }).compileComponents();
    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  }));

  it("should render a form", () => {
    const todoForm = fixture.nativeElement.querySelectorAll("form");

    expect(todoForm.length).toEqual(1);
  });

  it("should dispatch action on addTodo", () => {
    expect(storeMock.dispatch).not.toHaveBeenCalled();

    component.todoForm.controls['text'].setValue("blah")

    component.addTodo();
    expect(storeMock.dispatch).toHaveBeenCalledWith(
      new AddTodoAction({ text: "blah" }),
    );
  });
});
