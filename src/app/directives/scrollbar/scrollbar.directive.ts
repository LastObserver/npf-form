import { Directive, ElementRef } from '@angular/core';
import * as scrollbar from 'perfect-scrollbar';

@Directive({
  selector: '.js-scrollbar'
})
export class ScrollbarDirective {

  constructor(private el: ElementRef) {
    scrollbar.initialize(el.nativeElement);
  }

}
