import { Directive, ElementRef, Input, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Validators } from '@angular/forms';

// TODO: deal with THIS FUCKING ExpressionChangedAfterItHasBeenCheckedError ERROR

@Directive({
  selector: '[requiredIf]'
})
export class RequiredIfDirective {

  private element: HTMLElement
  @Input('requiredIf') condition: boolean

  constructor(private control: NgControl, private el: ElementRef, private cd: ChangeDetectorRef) {
    this.element = el.nativeElement
  }
  
  ngOnChanges(changes: SimpleChanges) {
    const { condition } = changes
    console.log(condition)
    if (condition) {
      if (condition.currentValue) {
        this.element.setAttribute('required', 'true')
        this.control.control.setValidators(Validators.required)
      } else {
        this.element.removeAttribute('required')
        this.control.control.clearValidators()
      }
    }
    this.control.control.updateValueAndValidity({ emitEvent: false, onlySelf: true })
  }

}
