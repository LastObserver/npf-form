import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, Host } from '@angular/core';
import { DataStep1 } from "../../../models/data-step-1";
import { Validators } from '@angular/forms';
import { FormStepComponent } from "./../form-step/form-step.component";
import { FormComponent } from '../form.component';
import { ApiService } from '../../../services/api.service';
import { CaptchaDirective } from '../../../directives/captcha/captcha.directive';

@Component({
  selector: 'form-step-1',
  templateUrl: './form-step-1.component.html',
  styleUrls: ['./form-step-1.component.styl']
})
export class FormStep1Component extends FormStepComponent implements OnInit {
  private formData: DataStep1
  @ViewChild(CaptchaDirective) captcha

  constructor(
    @Host() parent: FormComponent,
    public el: ElementRef,
    public cd: ChangeDetectorRef,
    public api: ApiService,
  ) {
    super(el, cd, api, parent)
    this.element = el.nativeElement
    this.formData = new DataStep1()
    this.api = api
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.captcha.updateCaptcha()
  }

  submitStep() {
    this.api.sendRequest(this.formData.transformedData)
      .subscribe(data => {
        console.log(data)
      })
  }
}
