import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";

import { TodoFormComponent } from "./todo-form.component";
import { AddTodoAction } from "../../store";

describe("TodoFormComponent", () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoFormComponent],
      schemas: [NO_ERRORS_SCHEMA],
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

  it("should dispatch action on addTodo", done => {
    component.todoForm.controls["text"].setValue("blah");

    component.onSubmit.subscribe(foo => {
      expect(foo).toEqual({ text: "blah" });
      done();
    });

    component.addTodo();
  });
});
