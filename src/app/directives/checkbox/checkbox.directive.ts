import { Directive, ElementRef, AfterViewInit } from '@angular/core';
import * as shortid from 'shortid';

@Directive({
  selector: '.ngx-checkbox'
})
export class CheckboxDirective implements AfterViewInit {
  private element: HTMLElement;
  private id: string;

  constructor(private el: ElementRef) {
    this.element = el.nativeElement;
    this.id = shortid.generate();
  }

  ngAfterViewInit() {
    this.element.querySelector('input').setAttribute('id', this.id);
    this.element.querySelector('label').setAttribute('for', this.id);
  }

}
