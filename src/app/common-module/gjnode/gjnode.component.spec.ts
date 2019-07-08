import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GjnodeComponent } from './gjnode.component';

describe('GjnodeComponent', () => {
  let component: GjnodeComponent;
  let fixture: ComponentFixture<GjnodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GjnodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GjnodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
