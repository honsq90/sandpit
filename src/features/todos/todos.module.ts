import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

import { TodosComponent } from "./components/todos/todos.component";

import * as fromStore from "./store";
import { StoreModule } from "@ngrx/store";

export const PRODUCT_ROUTES: Routes = [
  {
    path: "",
    component: TodosComponent,
    children: []
  }
];
@NgModule({
  declarations: [TodosComponent],
  exports: [TodosComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(PRODUCT_ROUTES),
    StoreModule.forFeature('todos', fromStore.reducers),
  ],
  providers: [],
  bootstrap: []
})
export class TodosModule {}
