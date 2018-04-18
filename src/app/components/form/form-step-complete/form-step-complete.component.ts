import { Component, OnInit, ElementRef, ChangeDetectorRef, Host } from '@angular/core';
import { FormStepComponent } from '../form-step/form-step.component';
import { DataService } from '../../../services/data.service';
import { ApiService } from '../../../services/api.service';
import { FormComponent } from '../form.component';

@Component({
  selector: 'app-form-step-complete',
  templateUrl: './form-step-complete.component.html',
  styleUrls: ['./form-step-complete.component.styl']
})
export class FormStepCompleteComponent extends FormStepComponent implements OnInit {

  constructor(
    public dataService: DataService,
    public el: ElementRef,
    public cd: ChangeDetectorRef,
    public api: ApiService,
    @Host() parent: FormComponent,
  ) {
    super(dataService, el, cd, api, true, parent);
  }

  ngOnInit() {
  }

  get appeal() {
    const step1Data = this.dataService.data.step1.transformedData;
    const genderAppeal = step1Data.gender === 'M' ? 'Уважаемый' : 'Уважаемая';
    const secondName = step1Data.no_second_name ? '' : ` ${step1Data.second_name}`;
    return `${genderAppeal} ${step1Data.name}${secondName}`;
  }

  get email() {
    return this.dataService.data.step1.transformedData.email;
  }

}
