import { Component, OnInit, Host, ElementRef, ChangeDetectorRef, SimpleChanges, OnChanges } from '@angular/core';
import { FormStepComponent } from '../form-step/form-step.component';
import { FormComponent } from '../form.component';
import { ApiService } from '../../../services/api.service';
import { DataStep2 } from '../../../models/data-step-2';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-form-step-2',
  templateUrl: './form-step-2.component.html',
  styleUrls: ['./form-step-2.component.styl']
})
export class FormStep2Component extends FormStepComponent implements OnInit, OnChanges {
  formData: DataStep2;
  private smsTimer: number;
  private interval: number;

  constructor(
    public dataService: DataService,
    public el: ElementRef,
    public cd: ChangeDetectorRef,
    public api: ApiService,
    @Host() parent: FormComponent,
  ) {
    super(dataService, el, cd, api, false, parent);
    this.formData = new DataStep2();
    this.formData = dataService.data.step2;
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    const { current } = changes;
    if (current && current.currentValue) {
      this.repeatSms();
    }
  }

  get tel() {
    return this.dataService.data.step1.transformedData.tel;
  }

  repeatSms() {
    this.api.sendSmsCode().subscribe(data => {
      this.resetTimer();
      this.startTimer();
    });
  }

  startTimer() {
    this.interval = window.setInterval(() => {
      if (this.smsTimer > 0) {
        this.smsTimer -= 1;
        this.cd.detectChanges();
      } else {
        window.clearInterval(this.interval);
      }
    }, 1000);
  }

  resetTimer() {
    window.clearInterval(this.interval);
    this.smsTimer = 30;
  }

}
