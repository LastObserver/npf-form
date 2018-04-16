import { Component, OnInit, ViewChild, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { FormStepComponent } from './form-step/form-step.component';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.styl'],
})
export class FormComponent implements OnInit {
  steps: FormStepComponent[]
  private states: number[]

  constructor(private cd: ChangeDetectorRef) {
    this.steps = []
    this.states = []
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    this.states = this.steps.map(step => {
      return step.getProgressValue()
    })
    this.cd.detectChanges()
  }

}
