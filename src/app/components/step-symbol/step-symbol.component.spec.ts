import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepSymbolComponent } from './step-symbol.component';

describe('StepSymbolComponent', () => {
  let component: StepSymbolComponent;
  let fixture: ComponentFixture<StepSymbolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepSymbolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepSymbolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
