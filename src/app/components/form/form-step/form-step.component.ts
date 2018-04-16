import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, Host } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormComponent } from '../form.component';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-form-step',
  templateUrl: './form-step.component.html',
  styleUrls: ['./form-step.component.styl']
})
export class FormStepComponent implements OnInit {
  @ViewChild('stepForm') form
  element: HTMLElement

  constructor(public el: ElementRef, public cd: ChangeDetectorRef, public api: ApiService, @Host() parent: FormComponent) {
    this.element = el.nativeElement
    parent.steps.push(this)
  }

  ngOnInit() {
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
