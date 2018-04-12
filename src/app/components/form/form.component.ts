import { Component, OnInit, ViewChild } from '@angular/core';
import { FormStep1Component } from './form-step-1/form-step-1.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.styl'],
})
export class FormComponent implements OnInit {
  @ViewChild(FormStep1Component) step1

  constructor() {
    console.log(this)
  }

  ngOnInit() {
  }

}
