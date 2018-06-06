import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { map, switchMap, catchError, retry, distinctUntilChanged } from 'rxjs/operators';

import * as fromActions from '../actions';
import { TodosService } from '../../services/todos.service';
import { of } from 'rxjs/observable/of';

@Injectable()
export class TodosEffects {
  constructor(private actions$: Actions, private todosService: TodosService) {}

  @Effect()
  loadTodos$ = this.actions$
    .ofType<fromActions.LoadTodosAction>(fromActions.LOAD_TODOS)
    .pipe(
      map(action => action.query),
      distinctUntilChanged(),
      switchMap(_ =>
        this.todosService
          .getTodos()
          .pipe(
            retry(2),
            map(todos => new fromActions.LoadTodosSuccessAction(todos)),
            catchError(error => of(new fromActions.LoadTodosFailAction(error))),
          ),
      ),
    );
}
