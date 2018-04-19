import { Directive, ElementRef, Input, SimpleChanges, ChangeDetectorRef, OnChanges } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Validators } from '@angular/forms';

@Directive({
  selector: '[requiredIf]'
})
export class RequiredIfDirective implements OnChanges {

  private element: HTMLElement;
  @Input() requiredIf: boolean;

  constructor(
    private control: NgControl,
    private el: ElementRef,
    private cd: ChangeDetectorRef
  ) {
    this.element = el.nativeElement;
  }
/**
 * Toggles required validator on requiredIf input change
 *
 * @param {SimpleChanges} changes
 * @memberof RequiredIfDirective
 */
  ngOnChanges(changes: SimpleChanges) {
    const { requiredIf } = changes;

    if (requiredIf) {
      if (requiredIf.currentValue) {
        this.element.setAttribute('required', 'true');
        this.control.control.setValidators(Validators.required);
      } else {
        this.element.removeAttribute('required');
        this.control.control.clearValidators();
      }
    }
    this.control.control.updateValueAndValidity({ emitEvent: false, onlySelf: true });
  }

}
