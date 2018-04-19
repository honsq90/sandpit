import { Component, Input, OnInit, Output } from "@angular/core";
import { Todo } from "../../models/todo.model";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "todo-form",
  templateUrl: "./todo-form.component.html"
})
export class TodoFormComponent implements OnInit {
  todoForm: FormGroup;

  ngOnInit() {
    this.todoForm = new FormGroup({
      text: new FormControl("")
    });
  }

  addTodo() {
    this.todoForm.reset();
  }
}
