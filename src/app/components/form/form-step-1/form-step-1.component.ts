import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataStep1 } from "../../../models/data-step-1";
import { StepsService } from "../../../services/steps.service";
import { Validators } from '@angular/forms';

//  TODO: fix setting validation and make model for formstep components

@Component({
  selector: 'form-step-1',
  templateUrl: './form-step-1.component.html',
  styleUrls: ['./form-step-1.component.styl']
})
export class FormStep1Component implements OnInit {
  private formData: DataStep1
  private element: HTMLElement
  @ViewChild('stepForm') form

  constructor(private el: ElementRef) {
    this.element = el.nativeElement
    this.formData = new DataStep1()
    console.log(this)
  }

  ngOnInit() {
  }

  setValidation(condition: boolean, name:string) {
    console.log(condition, name)
    const control = this.form.controls[name]
    if (condition) {
      control.setValidators(Validators.required)
    } else {
      control.clearValidators()
    }
    control.updateValueAndValidity({ emitEvent: false, onlySelf: true })
  }

  getProgressValue() {
    if (!this.form) { return 1 }
    const required = Array.from(this.element.querySelectorAll('[required]'))
    const controls = this.form.controls
    const valid = required.reduce((count, element) => {
      const name = element.getAttribute('ng-reflect-name')
      return controls[name] && controls[name].valid ? count + 1 : count
    }, 0)

    return valid / required.length
  }

}
