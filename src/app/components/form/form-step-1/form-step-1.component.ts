import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, Host, AfterViewInit } from '@angular/core';
import { DataStep1 } from '../../../models/data-step-1';
import { FormStepComponent } from './../form-step/form-step.component';
import { FormComponent } from '../form.component';
import { ApiService } from '../../../services/api.service';
import { CaptchaDirective } from '../../../directives/captcha/captcha.directive';
import { BackupService } from '../../../services/backup.service';

@Component({
  selector: 'app-form-step-1',
  templateUrl: './form-step-1.component.html',
  styleUrls: ['./form-step-1.component.styl']
})
export class FormStep1Component extends FormStepComponent implements OnInit, AfterViewInit {
  formData: DataStep1;
  @ViewChild(CaptchaDirective) captcha;

  constructor(
    public backupService: BackupService,
    public el: ElementRef,
    public cd: ChangeDetectorRef,
    public api: ApiService,
    @Host() parent: FormComponent,
  ) {
    super(backupService, el, cd, api, false, parent);
    this.formData = new DataStep1();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.captcha.updateCaptcha();
  }
}
