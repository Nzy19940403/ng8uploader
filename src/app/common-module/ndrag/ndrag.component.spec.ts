import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NDragComponent } from './ndrag.component';

describe('NDragComponent', () => {
  let component: NDragComponent;
  let fixture: ComponentFixture<NDragComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NDragComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NDragComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
