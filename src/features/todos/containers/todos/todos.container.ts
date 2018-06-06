import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Todo } from '../../models/todo.model';
import * as fromStore from '../../store';
import { AddTodoAction } from '../../store';

@Component({
  selector: 'app-todos-container-component',
  templateUrl: './todos.container.html'
})
export class TodosContainerComponent implements OnInit {
  todos$: Observable<Todo[]>;
  constructor(private _store: Store<fromStore.FeatureState>) {}

  ngOnInit() {
    this._store.dispatch(new fromStore.LoadTodosAction('hi'));
    this.todos$ = this._store.select(fromStore.getAllTodos);
  }

  dispatchAddTodo(value: Todo) {
    this._store.dispatch(new AddTodoAction(value));
  }
}
