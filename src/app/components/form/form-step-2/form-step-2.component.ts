import { Component, OnInit, Host, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormStepComponent } from '../form-step/form-step.component';
import { FormComponent } from '../form.component';
import { ApiService } from '../../../services/api.service';
import { DataStep2 } from '../../../models/data-step-2';
import { BackupService } from '../../../services/backup.service';

@Component({
  selector: 'app-form-step-2',
  templateUrl: './form-step-2.component.html',
  styleUrls: ['./form-step-2.component.styl']
})
export class FormStep2Component extends FormStepComponent implements OnInit {
  formData: DataStep2;

  constructor(
    public backupService: BackupService,
    public el: ElementRef,
    public cd: ChangeDetectorRef,
    public api: ApiService,
    @Host() parent: FormComponent,
  ) {
    super(backupService, el, cd, api, false, parent);
    this.formData = new DataStep2();
  }

  ngOnInit() {
  }

}
