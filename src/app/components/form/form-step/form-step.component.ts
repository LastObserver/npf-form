import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-form-step',
  templateUrl: './form-step.component.html',
  styleUrls: ['./form-step.component.styl']
})
export class FormStepComponent implements OnInit {
  @ViewChild('stepForm') form
  element: HTMLElement

  constructor(public el: ElementRef, public cd: ChangeDetectorRef) {
    this.element = el.nativeElement
  }

  ngOnInit() {
  }

  // setValidation(condition: boolean, name: string) {
  //   const control = this.form.controls[name]
  //   if (condition) {
  //     control.clearValidators()
  //   } else {
  //     control.setValidators(Validators.required)
  //   }
  //   control.updateValueAndValidity({ emitEvent: false, onlySelf: true })
  //   this.cd.detectChanges()
  // }


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
