import { Component, Input, OnInit, Output } from "@angular/core";
import { Store } from "@ngrx/store";
import { FormGroup, FormControl } from "@angular/forms";

import { Todo } from "../../models/todo.model";
import { FeatureState, AddTodoAction } from "../../store";

@Component({
  selector: "todo-form",
  templateUrl: "./todo-form.component.html",
})
export class TodoFormComponent implements OnInit {
  todoForm: FormGroup;

  constructor(private store: Store<FeatureState>) {}

  ngOnInit() {
    this.todoForm = new FormGroup({
      text: new FormControl(""),
    });
  }

  addTodo() {
    this.store.dispatch(new AddTodoAction(this.todoForm.value))
    this.todoForm.reset();
  }
}
