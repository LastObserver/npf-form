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
/**
 * Goes to the next step (if present)
 *
 * @memberof FormComponent
 */
  goForward() {
    if (this.currentStep < this.steps.length) {
      this.currentStep++;
      this.scrollToTop();
    }
  }

  addStep(step) {
    this.steps.push(step);
    this.states.push({
      progress: step.getProgressValue(),
      complete: step.complete,
    });
  }
/**
 * Goes to the previous step (if present)
 *
 * @memberof FormComponent
 */
  goBack() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.scrollToTop();
    }
  }
/**
 * Scrolls to the top of the window
 *
 * @memberof FormComponent
 */
  scrollToTop() {
    TweenLite.to(window, 0.5, { scrollTo: { y: 0 } });
  }
/**
 * Updates progress values for every step
 *
 * @memberof FormComponent
 */
  ngAfterViewChecked() {
    this.states.map((state, index) => {
      const step = this.steps[index];
      state.progress = step.getProgressValue();
      state.complete = step.complete;
    });
    this.cd.detectChanges();
  }

}
