import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";

import * as fromComponents from "./components";
import * as fromContainers from "./containers";
import * as fromStore from "./store";

export const PRODUCT_ROUTES: Routes = [
  {
    path: "",
    component: fromContainers.TodosContainer,
    children: []
  }
];
@NgModule({
  declarations: [...fromComponents.components, ...fromContainers.containers],
  exports: [...fromComponents.components, ...fromContainers.containers],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(PRODUCT_ROUTES),
    StoreModule.forFeature("todos", fromStore.reducers)
  ],
  providers: [],
  bootstrap: []
})
export class TodosModule {}
