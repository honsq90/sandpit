import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import { Todo } from '../models/todo.model';
import { of } from 'rxjs/observable/of';

@Injectable()
export class TodosService {
  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.http
      .get<Todo[]>(`http://localhost:3000/todos`)
      .pipe(catchError(this.handleError('getTodos', [])));
  }

  private handleError(operation = 'operation', result?) {
    return (error: any) => {
      console.error(operation, error);
      return of(result);
    };
  }
}
