import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStepCompleteComponent } from './form-step-complete.component';

describe('FormStepCompleteComponent', () => {
  let component: FormStepCompleteComponent;
  let fixture: ComponentFixture<FormStepCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormStepCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormStepCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
