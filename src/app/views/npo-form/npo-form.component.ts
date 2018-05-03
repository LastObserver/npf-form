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

  /**
   * Requests captcha
   *
   * @memberof NpoFormComponent
   */
  ngAfterViewInit() {
    this.captcha.updateCaptcha();
  }

  /**
   * Sends form data to api
   *
   * @memberof NpoFormComponent
   */
  onSubmit() {
    this.api.sendNPORequest(this.formData.transformedData)
      .subscribe(data => {
        this.form.goForward();
      });
  }

  /**
   * Returns appeal for user with his last name, name and second name (if present)
   *
   * @readonly
   * @returns {string} appeal
   * @memberof FormStepCompleteComponent
   */
  get appeal(): string {
    const step1Data = this.formData.step1.data;
    const genderAppeal = step1Data.gender === 'M' ? 'Уважаемый' : 'Уважаемая';
    const secondName = step1Data.no_second_name ? '' : ` ${step1Data.second_name}`;
    return `${genderAppeal} ${step1Data.name}${secondName}`;
  }

}
