import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LkForm01Component } from './lk-form-01.component';

describe('LkForm01Component', () => {
  let component: LkForm01Component;
  let fixture: ComponentFixture<LkForm01Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LkForm01Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LkForm01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
