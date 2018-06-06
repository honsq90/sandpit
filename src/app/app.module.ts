import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
} from '@ngrx/router-store';

import { AppComponent } from './containers/app.component';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../config/environments/environment';
import { reducers, CustomSerializer } from './store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';

const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'todos',
    loadChildren: '../features/todos/todos.module#TodosModule'
  }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([]),
    HttpClientModule,
    StoreRouterConnectingModule,
    StoreDevtoolsModule.instrument({
      logOnly: environment.production // Restrict extension to log-only mode
    })
  ],
  providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }],
  declarations: [AppComponent, HomeComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
