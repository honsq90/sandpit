import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";

import { Todo } from "../../models/todo.model";
import * as fromStore from "../../store";

@Component({
  selector: "todos-container",
  templateUrl: "./todos.container.html"
})
export class TodosContainer implements OnInit {
  todos$: Observable<Todo[]>;
  constructor(private _store: Store<fromStore.FeatureState>) {}

  ngOnInit() {
    this._store.dispatch(new fromStore.LoadTodosAction());
    this.todos$ = this._store.select(fromStore.getAllTodos);
  }
}
