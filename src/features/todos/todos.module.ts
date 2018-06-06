import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromComponents from './components';
import * as fromContainers from './containers';
import * as fromServices from './services';
import * as fromStore from './store';

export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    component: fromContainers.TodosContainerComponent,
    children: []
  }
];
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(PRODUCT_ROUTES),
    StoreModule.forFeature(fromStore.TODO_FEATURE, fromStore.reducers),
    EffectsModule.forFeature(fromStore.effects),
  ],
  providers: [...fromServices.services],
  declarations: [...fromComponents.components, ...fromContainers.containers],
  exports: [...fromComponents.components, ...fromContainers.containers],
})
export class TodosModule {}
