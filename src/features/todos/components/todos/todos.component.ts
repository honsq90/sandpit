import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Todo } from "../../models/todo.model";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import * as fromStore from "../../store";

@Component({
  selector: "app-todos",
  templateUrl: "./todos.component.html"
})
export class TodosComponent implements OnInit {
  todos$: Observable<Todo[]>;

  todoForm: FormGroup;

  constructor(private _store: Store<fromStore.FeatureState>) {}

  ngOnInit() {
    this.todos$ = this._store.select(fromStore.getAllTodos);
    this.todoForm = new FormGroup({
      text: new FormControl("")
    });
  }

  addTodo() {
    // this.todos.push(this.todoForm.value)
    this.todoForm.reset();
  }
}
