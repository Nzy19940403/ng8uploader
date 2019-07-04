import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GjModalComponent } from './gj-modal.component';

describe('GjModalComponent', () => {
  let component: GjModalComponent;
  let fixture: ComponentFixture<GjModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GjModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GjModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
