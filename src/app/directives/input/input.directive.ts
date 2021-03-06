import { Directive, ElementRef, Optional, Input, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { NgControl } from '@angular/forms';
import * as Inputmask from 'inputmask';

@Directive({
  selector: 'input[type="text"], select'
})
export class InputDirective implements OnInit {
  private element: HTMLInputElement;
  private wrapper: JQuery;

  /**
   * Creates an instance of InputDirective.
   * Adds input and change event handlers to move input's label
   * @param {ElementRef} el
   * @param {NgControl} control
   * @memberof InputDirective
   */
  constructor(
    private el: ElementRef,
    @Optional() private control: NgControl
  ) {
    this.element = el.nativeElement;
    this.wrapper = $(this.element).parents('.npf-input-group, .npf-select-group, .ngx-input-container');

    $(this.element).on('input change', () => {
      if (this.element.value) {
        this.wrapper.addClass('_has-value');
      } else {
        this.wrapper.removeClass('_has-value');
      }
    }).trigger('change');
  }

  /**
   * Adds mask (if present) to input
   *
   * @memberof InputDirective
   */
  ngOnInit() {
    if (!this.control) {
      return;
    }

    const mask = this.element.getAttribute('data-mask');
    const placeholder = this.element.getAttribute('data-mask-placeholder') || ' ';

    if (mask) {
      switch (mask) {
        case 'rusNameMask':
        break;
        case 'engNameMask':
        break;
        case 'dateMask': {
          const options = {
            showMaskOnHover: false,
            placeholder: '__.__.____',
          };
          Inputmask('dd.mm.yyyy', options).mask(this.element);
        }
        break;

        case 'intMask': {
          const options = {
            showMaskOnHover: false,
            regex: '^[0-9]*$'

          };
          Inputmask(options).mask(this.element);
        }
        break;

        default: {
          const options = {
            showMaskOnHover: false,
            placeholder,
            oncomplete: () => this.handleChange(),
            onincomplete: () => this.handleChange(),
            oncleared: () => this.handleChange(),
          };
          Inputmask(mask, options).mask(this.element);
          break;
        }
      }
    }
  }

  private handleChange() {
    this.control.control.patchValue(this.element.value);
  }
}
