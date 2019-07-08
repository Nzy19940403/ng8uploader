import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Route4Component } from './route4.component';

describe('Route4Component', () => {
  let component: Route4Component;
  let fixture: ComponentFixture<Route4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Route4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Route4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
