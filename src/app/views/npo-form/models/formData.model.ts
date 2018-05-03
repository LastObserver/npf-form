import { DataStep1 } from '../../../models/data-step-1';
import { DataStep2 } from '../../../models/data-step-2';
import { DataStep3 } from '../../../models/data-step-3';

export class FormDataModel {

  step1: DataStep1;
  step2: DataStep2;
  step3: DataStep3;

  constructor() {
    this.step1 = new DataStep1();
    this.step2 = new DataStep2();
    this.step3 = new DataStep3();
  }
  /**
   * Returns transformed data from all steps to send to api
   *
   * @readonly
   * @memberof DataService
   */
  get transformedData() {
    return {
      personal: this.step1.transformedData,
      passport: this.step2.transformedData,
      payment: this.step3.transformedData,
    };
  }

  /**
   * Returns user's full name
   *
   * @readonly
   * @returns {string} full name
   * @memberof DataService
   */
  get fullname() {
    const step1Data = this.step1.transformedData;
    return `${step1Data.last_name} ${step1Data.name}${step1Data.last_name || ''}`;
  }

}
