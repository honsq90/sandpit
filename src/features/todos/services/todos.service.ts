import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import { Todo } from '../models/todo.model';

@Injectable()
export class TodosService {
  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http
      .get<Todo[]>(`http://localhost:3000/todos`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }
}
