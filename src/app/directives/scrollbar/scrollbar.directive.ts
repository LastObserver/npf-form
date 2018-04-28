import { Directive, ElementRef } from '@angular/core';
import * as scrollbar from 'perfect-scrollbar';

@Directive({
  selector: '.js-scrollbar'
})
export class ScrollbarDirective {
  /**
   * Creates an instance of ScrollbarDirective.
   * Initializes perfect-scrollbar on element
   * @param {ElementRef} el
   * @memberof ScrollbarDirective
   */
  constructor(private el: ElementRef) {
    scrollbar.initialize(el.nativeElement);
  }

}
