import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { DataStep1 } from "../../../models/data-step-1";
import { StepsService } from "../../../services/steps.service";
import { Validators } from '@angular/forms';
import { FormStepComponent } from "./../form-step/form-step.component";

@Component({
  selector: 'form-step-1',
  templateUrl: './form-step-1.component.html',
  styleUrls: ['./form-step-1.component.styl']
})
export class FormStep1Component extends FormStepComponent implements OnInit {
  private formData: DataStep1

  constructor(public el: ElementRef, public cd: ChangeDetectorRef) {
    super(el, cd)
    this.element = el.nativeElement
    this.formData = new DataStep1()
  }

  ngOnInit() {
  }
}
