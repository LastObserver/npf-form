import { Component, OnInit, Host, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormStepComponent } from '../form-step/form-step.component';
import { DataStep3 } from '../../../models/data-step-3';
import { FormComponent } from '../form.component';
import { ApiService } from '../../../services/api.service';
import { BackupService } from '../../../services/backup.service';

@Component({
  selector: 'app-form-step-3',
  templateUrl: './form-step-3.component.html',
  styleUrls: ['./form-step-3.component.styl']
})
export class FormStep3Component extends FormStepComponent implements OnInit {
  formData: DataStep3;

  constructor(
    public backupService: BackupService,
    public el: ElementRef,
    public cd: ChangeDetectorRef,
    public api: ApiService,
    @Host() parent: FormComponent,
  ) {
    super(backupService, el, cd, api, false, parent);
    this.formData = new DataStep3();
  }

  ngOnInit() {
  }

}
