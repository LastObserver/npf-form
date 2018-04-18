import { Injectable } from '@angular/core';
import { DataStep1 } from '../models/data-step-1';
import { DataStep2 } from '../models/data-step-2';
import { DataStep3 } from '../models/data-step-3';

@Injectable()
export class DataService {
  public data: {
    step1: DataStep1,
    step2: DataStep2,
    step3: DataStep3,
  };
  constructor() {
    this.data = {
      step1: new DataStep1(),
      step2: new DataStep2(),
      step3: new DataStep3(),
    };
  }

  get transformedData() {
    console.log(this.data);
    return {
      personal: this.data.step1.transformedData,
      passport: this.data.step2.transformedData,
      payment: this.data.step3.transformedData,
    };
  }

}
