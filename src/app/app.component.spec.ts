import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render a list of talks', () => {
    fixture.detectChanges();

    const s = fixture.debugElement.nativeElement;
    const appTodos = s.querySelectorAll("app-todos");
    const routerOutlet = s.querySelectorAll("router-outlet");

    expect(appTodos.length).toEqual(1);
    expect(routerOutlet.length).toEqual(1);
  });
});
