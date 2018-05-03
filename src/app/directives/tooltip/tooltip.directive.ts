import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';
import 'qtip2';
import * as $ from 'jquery';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective implements AfterViewInit{
  @Input() appTooltip: string;
  @Input() tooltipMy: string;
  @Input() tooltipAt: string;
  private element: HTMLElement;

  constructor(
    private el: ElementRef
  ) {
    this.element = el.nativeElement;
  }

  /**
   * Initializes tooltip on element
   *
   * @memberof TooltipDirective
   */
  ngAfterViewInit() {
    $(this.element).qtip({
      content: this.appTooltip,
      style: {
        classes: 'npf-tooltip__theme _white',
        tip: {
          border: true,
          width: 20,
          height: 10,
        },
      },
      hide: {
        event: 'unfocus click',
      },
      position: {
        container: $(document.body),
        my: this.tooltipMy || 'top center',
        at: this.tooltipAt || 'bottom center',
        target: $(this.element),
        viewport: true,
      },
    });
  }

}
