import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, Host } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormComponent } from '../form.component';
import { ApiService } from '../../../services/api.service';
import { DataStep2 } from '../../../models/data-step-2';
import { DataStep1 } from '../../../models/data-step-1';
import { DataStep3 } from '../../../models/data-step-3';
import { BackupService } from '../../../services/backup.service';

@Component({
  selector: 'app-form-step',
  templateUrl: './form-step.component.html',
  styleUrls: ['./form-step.component.styl']
})
export class FormStepComponent implements OnInit {
  @ViewChild('stepForm') form;
  element: HTMLElement;
  private parent: FormComponent;
  formData: DataStep1 | DataStep2 | DataStep3;

  constructor(
    public backupService: BackupService,
    public el: ElementRef,
    public cd: ChangeDetectorRef,
    public api: ApiService,
    public complete: boolean,
    @Host() parent: FormComponent,
  ) {
    this.element = el.nativeElement;
    this.parent = parent;
    this.complete = complete;
    parent.steps.push(this);
  }

  ngOnInit() {
  }

  getProgressValue() {
    if (!this.form) { return 1; }
    const required = Array.from(this.element.querySelectorAll('[required]'));
    const controls = this.form.controls;
    const valid = required.reduce((count, element) => {
      const name = element.getAttribute('ng-reflect-name');
      return controls[name] && controls[name].valid ? count + 1 : count;
    }, 0);

    return valid / required.length;
  }

  onSuccess() {
    this.parent.goForward();
  }

  submitStep() {
    this.api.sendRequest(this.formData)
      .subscribe(data => {
        this.onSuccess();
      });
  }

}
