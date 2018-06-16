import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { configureTestSuite } from '../../config/setupJest';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  configureTestSuite();

  beforeAll((done) => (async () => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });

    await TestBed.compileComponents();
  })().then(done).catch(done.fail));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('should render a list of talks', () => {
    fixture.detectChanges();

    const s = fixture.debugElement.nativeElement;
    const routerOutlet = s.querySelectorAll('router-outlet');

    expect(routerOutlet.length).toEqual(1);
  });
});
