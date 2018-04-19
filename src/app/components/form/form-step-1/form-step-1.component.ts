import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, Host, AfterViewInit } from '@angular/core';
import { DataStep1 } from '../../../models/data-step-1';
import { FormStepComponent } from './../form-step/form-step.component';
import { FormComponent } from '../form.component';
import { ApiService } from '../../../services/api.service';
import { CaptchaDirective } from '../../../directives/captcha/captcha.directive';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-form-step-1',
  templateUrl: './form-step-1.component.html',
  styleUrls: ['./form-step-1.component.styl']
})
export class FormStep1Component extends FormStepComponent implements OnInit, AfterViewInit {
  formData: DataStep1;
  @ViewChild(CaptchaDirective) captcha;

  constructor(
    public dataService: DataService,
    public el: ElementRef,
    public cd: ChangeDetectorRef,
    public api: ApiService,
    @Host() parent: FormComponent,
  ) {
    super(dataService, el, cd, api, false, parent);
    this.formData = dataService.data.step1;
  }

  ngOnInit() {
  }
/**
 * Calls CaptchaDirective method to update captcha
 *
 * @memberof FormStep1Component
 */
  ngAfterViewInit() {
    this.captcha.updateCaptcha();
  }
}
