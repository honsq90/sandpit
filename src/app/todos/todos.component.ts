import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

export interface Todo {
  text: string;
}

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent {

  todos: Todo[] = [];

  todoForm: FormGroup;

  constructor() {
    this.todoForm = new FormGroup({
      text: new FormControl('')
    })
  }

  addTodo() {
    this.todos.push(this.todoForm.value)
    this.todoForm.reset()
  }

}
