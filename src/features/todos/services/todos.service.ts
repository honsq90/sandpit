import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Todo } from '../models/todo.model';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TodosService {
  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.http
      .get<Todo[]>(`http://localhost:3000/todos`)
      .pipe(
        catchError(this.handleError('getTodos', []))
      );
  }

  private handleError(operation = 'operation', result?) {
    return (error: any) => {
      console.error(operation, error);
      return of(result);
    };
  }
}
