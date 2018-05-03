import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NpoFormComponent } from './npo-form.component';

describe('NpoFormComponent', () => {
  let component: NpoFormComponent;
  let fixture: ComponentFixture<NpoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NpoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NpoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
