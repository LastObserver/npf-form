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
    isForm: boolean,
    id: string,
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
      id: id,
    });
  }

  public removeStep(step: FormStepComponent) {
    const { id } = step;

    this.states.splice(this.states.findIndex(state => state.id === id), 1);
    this.steps.splice(this.steps.findIndex(stepRef => stepRef.id === id), 1);

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
      const stepRef = this.steps.find(step => step.id === state.id);
      state.progress = stepRef.getProgressValue();
      state.isForm = stepRef.isForm;
    });

    this.cd.detectChanges();
  }

  private toggleSteps() {
    this.steps.map((step, ind) => {
      step.toggleVisibility(this.currentStepId === step.id);
    });
  }

}
