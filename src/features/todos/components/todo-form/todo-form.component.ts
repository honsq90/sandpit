import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Todo } from "../../models/todo.model";

@Component({
  selector: "todo-form",
  templateUrl: "./todo-form.component.html",
})
export class TodoFormComponent implements OnInit {
  todoForm: FormGroup;
  @Output() onSubmit: EventEmitter<Todo> = new EventEmitter<Todo>();

  ngOnInit() {
    this.todoForm = new FormGroup({
      text: new FormControl(""),
    });
  }

  addTodo() {
    this.onSubmit.emit(this.todoForm.value);
    this.todoForm.reset();
  }
}
