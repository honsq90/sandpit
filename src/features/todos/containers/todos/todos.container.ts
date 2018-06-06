import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Todo } from '../../models/todo.model';
import { FeatureState } from '../../store/reducers';
import { LoadTodosAction, AddTodoAction } from '../../store/actions';
import { getAllTodos } from '../../store/selectors/todos.selectors';

@Component({
  selector: 'app-todos-container-component',
  templateUrl: './todos.container.html'
})
export class TodosContainerComponent implements OnInit {
  todos$: Observable<Todo[]>;
  constructor(private _store: Store<FeatureState>) {}

  ngOnInit() {
    this._store.dispatch(new LoadTodosAction('hi'));
    this.todos$ = this._store.select(getAllTodos);
  }

  dispatchAddTodo(value: Todo) {
    this._store.dispatch(new AddTodoAction(value));
  }
}
