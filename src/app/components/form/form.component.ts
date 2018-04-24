import { Component, OnInit, ViewChild, SimpleChanges, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { FormStepComponent } from './form-step/form-step.component';
import { TweenLite } from 'gsap';
import 'gsap/scrollToPlugin.js';


// TODO: deal with double submitting


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.styl'],
})
export class FormComponent implements OnInit, AfterViewChecked {
  steps: FormStepComponent[];
  private states: {
    progress: number,
    isForm: boolean;
  }[];
  private currentStep: number;
  public currentStepId: string;

  constructor(private cd: ChangeDetectorRef) {
    this.steps = [];
    this.states = [];
  }

  ngOnInit() {
  }

  public addStep(step: FormStepComponent) {
    const { id } = step;

    if (!this.steps.length) {
      this.currentStep = 1;
      this.currentStepId = id;
    }

    step.toggleVisibility(step.id === this.currentStepId);

    this.steps.push(step);

    this.states.push({
      progress: step.getProgressValue(),
      isForm: step.isForm,
    });
  }
  /**
   * Goes to the next step (if present)
   *
   * @memberof FormComponent
   */
  public goForward() {
    if (this.currentStep < this.steps.length) {
      const step = this.steps[this.currentStep];
      const { id } = step;

      this.currentStepId = id;
      this.currentStep++;

      this.toggleSteps();
      this.scrollToTop();
      console.log(this.currentStep);
    }
  }
  /**
   * Goes to the previous step (if present)
   *
   * @memberof FormComponent
   */
  public goBack() {
    if (this.currentStep > 1) {
      const step = this.steps[this.currentStep - 2];
      const { id } = step;

      this.currentStepId = id;
      this.currentStep--;

      this.toggleSteps();
      this.scrollToTop();
    }
  }

/**
 * Scrolls to the top of the window
 *
 * @memberof FormComponent
 */
  private scrollToTop() {
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
      state.isForm = step.isForm;
    });

    this.cd.detectChanges();
  }

  private toggleSteps() {
    this.steps.map((step, ind) => {
      step.toggleVisibility(this.currentStepId === step.id);
    });
  }

}
