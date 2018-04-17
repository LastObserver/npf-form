import { Component, OnInit, ElementRef, ChangeDetectorRef, Host } from '@angular/core';
import { FormStepComponent } from '../form-step/form-step.component';
import { BackupService } from '../../../services/backup.service';
import { ApiService } from '../../../services/api.service';
import { FormComponent } from '../form.component';

@Component({
  selector: 'app-form-step-complete',
  templateUrl: './form-step-complete.component.html',
  styleUrls: ['./form-step-complete.component.styl']
})
export class FormStepCompleteComponent extends FormStepComponent implements OnInit {

  constructor(
    public backupService: BackupService,
    public el: ElementRef,
    public cd: ChangeDetectorRef,
    public api: ApiService,
    @Host() parent: FormComponent,
  ) {
    super(backupService, el, cd, api, true, parent);
  }

  ngOnInit() {
  }

}
