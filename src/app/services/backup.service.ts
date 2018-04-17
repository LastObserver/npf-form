import { Injectable } from '@angular/core';
import { DataStep1 } from '../models/data-step-1';
import { DataStep2 } from '../models/data-step-2';
import { DataStep3 } from '../models/data-step-3';

@Injectable()
export class BackupService {
  public data: {
    step1: DataStep1,
    step2: DataStep2,
    step3: DataStep3,
  };
  constructor() {
  }

}
