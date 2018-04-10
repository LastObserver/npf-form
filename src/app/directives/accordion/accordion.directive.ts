import { Directive, ElementRef } from '@angular/core';
import * as $ from 'jquery';
import { TweenMax } from 'gsap';

// TODO: add types declaration for gsap

@Directive({
  selector: '._js-accordion',
})
export class AccordionDirective {

  private element: HTMLElement
  private mq: {
    matches: Boolean
  }
  private footer: string = '.npf-page__footer'
  private header: string = '.head'

  constructor(private el:ElementRef) {
    this.element = el.nativeElement

    this.mq = window.matchMedia('(min-width: 768px)')

    if (this.mq.matches) {
      if ($(this.footer).find('._js-accordion').hasClass('_hidden')) {
        TweenMax.set($(this.footer).find('._js-accordion__body'), { height: 'auto' })
        TweenMax.from($(this.footer).find('._js-accordion__body'), 0.3, { height: 0 })
        $(this.footer).find('._js-accordion').removeClass('_hidden')
      }
    }

    if (this.mq.matches) {
      if ($(this.header).find('._js-accordion').hasClass('_hidden')) {
        TweenMax.set($(this.header).find('._js-accordion__body'), { height: 'auto' })
        TweenMax.from($(this.header).find('._js-accordion__body'), 0.3, { height: 0 })
        $(this.header).find('._js-accordion').removeClass('_hidden')
      }
    }


  }

  ngAfterViewInit() {
    this.element.querySelector('._js-accordion__header').addEventListener('click', this.onClick.bind(this))
  }

  onClick(event) {
    event.preventDefault()

    const self = $(event.target)
    const container = self.closest('._js-accordion')
    const content = container.find('._js-accordion__body')
    if (self.parents(this.footer).length) {
      if (this.mq.matches) {
        return
      }
    }

    if (self.parents(this.header).length) {
      if (this.mq.matches) {
        return
      }
    }

    if (!container.hasClass('_hidden')) {
      TweenMax.to(content, 0.3, { height: 0 })
      container.addClass('_hidden')
    } else {
      TweenMax.set(content, { height: 'auto' })
      TweenMax.from(content, 0.3, { height: 0 })
      container.removeClass('_hidden')
    }
  }

}
