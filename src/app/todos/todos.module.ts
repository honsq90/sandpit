import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { TodosComponent } from './todos.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    component: TodosComponent,
    children: [],
  }
]
@NgModule({
  declarations: [
    TodosComponent
  ],
  exports: [
    TodosComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(PRODUCT_ROUTES),
  ],
  providers: [],
  bootstrap: []
})
export class TodosModule { }
