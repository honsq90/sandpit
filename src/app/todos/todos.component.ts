import { Component, OnInit } from '@angular/core';

export interface Todo {
  text: string;
}

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos: Todo[] = [
    { text: 'hello' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
