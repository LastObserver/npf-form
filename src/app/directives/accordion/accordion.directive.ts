import { Directive, ElementRef } from '@angular/core';
import * as $ from 'jquery';
import { TweenMax } from 'gsap';


@Directive({
  selector: '._js-accordion',
})
export class AccordionDirective {

  private element: HTMLElement
  private head: Element
  private body: Element
  private isSpecial: Boolean
  private mq: {
    matches: Boolean
  }

  constructor(private el:ElementRef) {
    this.element = el.nativeElement
    this.isSpecial = $(this.element).parents('.npf-page__footer').length || $(this.element).parents('.head').length
    this.mq = window.matchMedia('(min-width: 768px)')
  }

  ngAfterViewInit() {
    this.head = this.element.querySelector('._js-accordion__header')
    this.body = this.element.querySelector('._js-accordion__body')

    if (this.mq.matches) {
      if (this.element.classList.contains('_hidden') && this.isSpecial) {
        TweenMax.set(this.body, { height: 'auto' })
        TweenMax.from(this.body, 0.3, { height: 0 })
        this.element.classList.remove('_hidden')
      }
    }

    if (this.mq.matches) {
      if (this.element.classList.contains('_hidden') && this.isSpecial) {
        TweenMax.set(this.body, { height: 'auto' })
        TweenMax.from(this.body, 0.3, { height: 0 })
        this.element.classList.remove('_hidden')
      }
    }
    this.head.addEventListener('click', this.onClick.bind(this))
  }

  onClick(event) {
    event.preventDefault()

    if (this.isSpecial && this.mq.matches) {
      return false
    }

    if (this.element.classList.contains('_hidden')) {
      TweenMax.set(this.body, { height: 'auto' })
      TweenMax.from(this.body, 0.3, { height: 0 })
      this.element.classList.remove('_hidden')
    } else {
      TweenMax.to(this.body, 0.3, { height: 0 })
      this.element.classList.add('_hidden')
    }
  }

}
