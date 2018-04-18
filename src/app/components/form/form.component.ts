import { Component, OnInit, ViewChild, SimpleChanges, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { FormStepComponent } from './form-step/form-step.component';
import { TweenLite } from 'gsap';
import 'gsap/scrollToPlugin.js';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.styl'],
})
export class FormComponent implements OnInit, AfterViewChecked {
  steps: FormStepComponent[];
  private states: {
    progress: number,
    complete: boolean;
  }[];
  private currentStep: number;

  constructor(private cd: ChangeDetectorRef) {
    this.steps = [];
    this.states = [];
    this.currentStep = 1;
  }

  ngOnInit() {
  }

  goForward() {
    if (this.currentStep < this.steps.length) {
      this.currentStep++;
      this.scrollToTop();
    }
  }

  goBack() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.scrollToTop();
    }
  }

  scrollToTop() {
    TweenLite.to(window, 0.5, { scrollTo: { y: 0 } });
  }

  ngAfterViewChecked() {
    this.states = this.steps.map(step => {
      return {
        progress: step.getProgressValue(),
        complete: step.complete,
      };
    });
    this.cd.detectChanges();
  }

}
