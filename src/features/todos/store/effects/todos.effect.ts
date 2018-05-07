import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { map, switchMap, catchError } from "rxjs/operators";

import * as fromActions from "../actions";
import { TodosService } from "../../services/todos.service";
import { of } from "rxjs/observable/of";

@Injectable()
export class TodosEffects {
  constructor(private actions$: Actions, private todosService: TodosService) {}

  @Effect()
  loadTodos$ = this.actions$
    .ofType(fromActions.LOAD_TODOS)
    .pipe(
      switchMap(_ =>
        this.todosService
          .getTodos()
          .pipe(
            map(todos => new fromActions.LoadTodosSuccessAction(todos)),
            catchError(error => of(new fromActions.LoadTodosFailAction(error))),
          ),
      ),
    );
}
