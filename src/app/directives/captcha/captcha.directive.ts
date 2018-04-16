import { Directive, ElementRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import * as $ from 'jquery';

@Directive({
  selector: '.npf-captcha-group'
})
export class CaptchaDirective {
  private element: HTMLElement
  private link: HTMLLinkElement
  private img: HTMLImageElement
  private input: HTMLInputElement
  private textInput: HTMLInputElement

  constructor(
    private el: ElementRef,
    private api: ApiService,
  ) {
    this.element = el.nativeElement
  }

  ngAfterViewInit() {
    this.link = <HTMLLinkElement>this.element.querySelector('.npf-captcha-group__update')
    this.img = <HTMLImageElement>this.element.querySelector('.npf-captcha-group__image-group img')
    this.input = <HTMLInputElement>this.element.querySelector('.npf-captcha-group__image-group input')
    this.textInput = <HTMLInputElement>this.element.querySelector('.npf-captcha-group__input-group input')

    this.link.addEventListener('click', event => {
      event.preventDefault()
      this.updateCaptcha()
    })
  }

  updateCaptcha() {

    if (this.link.classList.contains('_loading')) return false
    this.link.classList.add('_loading')

    const url = this.link.getAttribute('href')

    this.api.requestCaptcha(url)
      .subscribe(data => {
        this.input.value = data['value']
        this.img.setAttribute('src', data['src'])
        this.textInput.value = ''
        setTimeout(() => {
          this.link.classList.remove('_loading')
        }, 300);
      })

  }

}
