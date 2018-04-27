import {
  Component, OnInit, ViewChild,
  ElementRef, ChangeDetectorRef, Host,
  Input, EventEmitter, Output, ContentChildren,
  QueryList, AfterViewInit, OnDestroy
} from '@angular/core';
import { Validators, NgModel } from '@angular/forms';
import { FormComponent } from '../form.component';
import { ApiService } from '../../../services/api.service';
import { DataStep2 } from '../../../models/data-step-2';
import { DataStep1 } from '../../../models/data-step-1';
import { DataStep3 } from '../../../models/data-step-3';
import { DataService } from '../../../services/data.service';
import * as shortid from 'shortid';

@Component({
  selector: 'form-step',
  templateUrl: './form-step.component.html',
  styleUrls: ['./form-step.component.styl']
})
export class FormStepComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('stepForm') form;
  @Output() submited: EventEmitter<any> = new EventEmitter();
  @ContentChildren(NgModel, { descendants: true }) models: QueryList<NgModel>;
  public isForm: boolean;
  private parent: FormComponent;
  public id: string;
  public element: HTMLElement;
  public formData: DataStep1 | DataStep2 | DataStep3;

  constructor(
    public dataService: DataService,
    public el: ElementRef,
    public cd: ChangeDetectorRef,
    public api: ApiService,
    @Host() parent: FormComponent,
  ) {
    this.element = el.nativeElement;
    this.parent = parent;
    this.id = shortid.generate();
  }

  ngOnInit() {
    this.parent.addStep(this);
    this.isForm = !!this.submited.observers.length;
  }

  ngAfterViewInit() {
    this.models.toArray().map(model => this.form.addControl(model));
  }

  ngOnDestroy() {
    this.parent.removeStep(this);
  }

  /**
   * Calculates current progress for required inputs
   *
   * @returns {number} progress value
   * @memberof FormStepComponent
   */
  public getProgressValue() {
    if (!this.form) { return this.element.getAttribute('hidden') ? 0 : 1; }

    const required = Array.from(this.element.querySelectorAll('[required]'));
    const controls = this.form.controls;

    const valid = required.reduce((count, element) => {
      const name = element.getAttribute('ng-reflect-name');
      return controls[name] && controls[name].valid ? count + 1 : count;
    }, 0);

    return valid / required.length;
  }

  /**
   * Submits step's form data
   *
   * @memberof FormStepComponent
   */
  private submitStep() {
    this.submited.emit();
  }

  public toggleVisibility(condition: boolean) {
    if (condition) {
      this.element.removeAttribute('hidden');
    } else {
      this.element.setAttribute('hidden', 'true');
    }
  }

}
