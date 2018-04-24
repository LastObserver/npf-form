import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DataStep1 } from '../../models/data-step-1';
import { CaptchaDirective } from '../../directives/captcha/captcha.directive';
import { FormComponent } from '../../components/form/form.component';
import { ApiService } from '../../services/api.service';
import { FormDataModel } from './models/formData.model';

@Component({
  selector: 'app-npo-form',
  templateUrl: './npo-form.component.html',
  styleUrls: ['./npo-form.component.styl']
})
export class NpoFormComponent implements OnInit, AfterViewInit {

  formData: FormDataModel;
  @ViewChild(CaptchaDirective) captcha;
  @ViewChild(FormComponent) form: FormComponent;

  constructor(private api: ApiService) {
    this.formData = new FormDataModel;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.captcha.updateCaptcha();
  }

  onSubmit() {
    console.log('boop');
    this.api.sendRequest(this.formData.transformedData)
      .subscribe(data => {
        this.form.goForward();
      });
  }

}
