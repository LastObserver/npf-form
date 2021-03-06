import * as $ from 'jquery';
import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange, ElementRef } from '@angular/core';
import { TweenMax } from 'gsap';
import '../../../utils/draw-svg.js';

@Component({
  selector: 'step-symbol',
  templateUrl: './step-symbol.component.html',
  styleUrls: ['./step-symbol.component.styl'],
})
export class StepSymbolComponent implements OnInit, OnChanges {

  @Input() index: string;
  @Input() isForm: boolean;
  @Input() progress: number;
  private element: HTMLElement;

  constructor(private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit() {
  }
/**
 * Draws progress line on progress value changes
 *
 * @param {SimpleChanges} changes
 * @memberof StepSymbolComponent
 */
ngOnChanges(changes: SimpleChanges) {
    const { progress } = changes;

    if (progress) {
      if (progress.isFirstChange()) {
        TweenMax.set($('.npf-step__progress-value', this.element), {
          drawSVG: `${progress.currentValue * 100}% 0%`,
        });
      } else {
        TweenMax.to($('.npf-step__progress-value', this.element), 1 / 4, {
          drawSVG: `${progress.currentValue * 100}% 0%`,
        });
      }
      $('.npf-step', this.element)
        .toggleClass('_success', progress.currentValue === 1);
    }

  }

}
