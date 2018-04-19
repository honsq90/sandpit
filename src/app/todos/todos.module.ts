import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { TodosComponent } from './todos.component';

@NgModule({
  declarations: [
    TodosComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
  ],
  exports: [
    TodosComponent
  ],
  providers: [],
  bootstrap: []
})
export class TodosModule { }
