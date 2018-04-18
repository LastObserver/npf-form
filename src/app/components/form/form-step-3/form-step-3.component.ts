import { Component, OnInit, Host, ElementRef, ChangeDetectorRef, SimpleChanges, OnChanges } from '@angular/core';
import { FormStepComponent } from '../form-step/form-step.component';
import { DataStep3 } from '../../../models/data-step-3';
import { FormComponent } from '../form.component';
import { ApiService } from '../../../services/api.service';
import { DataService } from '../../../services/data.service';
import { DataStep1 } from '../../../models/data-step-1';

@Component({
  selector: 'app-form-step-3',
  templateUrl: './form-step-3.component.html',
  styleUrls: ['./form-step-3.component.styl']
})
export class FormStep3Component extends FormStepComponent implements OnInit, OnChanges {
  formData: DataStep3;
  private step1Data: any;
  private step2Data: any;

  constructor(
    public dataService: DataService,
    public el: ElementRef,
    public cd: ChangeDetectorRef,
    public api: ApiService,
    @Host() parent: FormComponent,
  ) {
    super(dataService, el, cd, api, false, parent);
    this.formData = new DataStep3();
    this.formData = dataService.data.step3;
    this.step1Data = {};
    this.step2Data = {};
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    const { current } = changes;
    if (current && current.currentValue) {
      this.step1Data = this.dataService.data.step1.transformedData;
      this.step2Data = this.dataService.data.step2.transformedData;
    }
  }

}
