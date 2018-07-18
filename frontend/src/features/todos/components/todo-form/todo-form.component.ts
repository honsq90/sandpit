import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Todo } from '../../models/todo.model';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
})
export class TodoFormComponent implements OnInit {
  todoForm: FormGroup;
  @Output() submitEmitter: EventEmitter<Todo> = new EventEmitter<Todo>();

  ngOnInit() {
    this.todoForm = new FormGroup({
      text: new FormControl(),
    });

    this.onFormChange().subscribe((alert) => {
      console.log(alert);
    });
  }

  onFormChange() {
    return this.todoForm.valueChanges.pipe(
      map(({ text }) => text),
      filter((text) => text && text.length > 2),
    );
  }

  addTodo() {
    this.submitEmitter.emit(this.todoForm.value);
    this.todoForm.reset();
  }
}
