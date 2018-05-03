import { Directive, ElementRef, Optional, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
import 'bootstrap-datepicker';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '._js_datepicker-single'
})
export class DatepickerDirective implements AfterViewInit {
  private element: HTMLInputElement;

  /**
   * Creates an instance of DatepickerDirective.
   * Sets names for datepicker
   * @param {ElementRef} el
   * @param {NgControl} control
   * @memberof DatepickerDirective
   */
  constructor(
    private el: ElementRef,
    @Optional() private control: NgControl
  ) {
    this.element = el.nativeElement;

    $.fn.datepicker['dates'].ru = {
      days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
      daysShort: ['Вск', 'Пнд', 'Втр', 'Срд', 'Чтв', 'Птн', 'Суб'],
      daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
      today: 'Сегодня',
      clear: 'Очистить',
      format: 'dd.mm.yyyy',
      weekStart: 1,
    };
  }

  /**
   * Initializes datepicker and binds onhide and onshow event handlers
   *
   * @memberof DatepickerDirective
   */
  ngAfterViewInit() {

    $(this.element).datepicker({
      language: 'ru',
      autoclose: true,
      maxViewMode: 2,
      templates: {
        leftArrow: '<span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="#1a991a" d="M13 17.25a1.25 1.25 0 0 1-.88-.37L5.23 10l6.88-6.88a1.25 1.25 0 0 1 1.77 1.77L8.77 10l5.12 5.12a1.25 1.25 0 0 1-.89 2.13z"/></svg></span>',
        rightArrow: '<span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="#1a991a" d="M7 17.25a1.25 1.25 0 0 1-.88-2.13L11.23 10 6.12 4.88a1.25 1.25 0 0 1 1.76-1.76L14.77 10l-6.89 6.88a1.25 1.25 0 0 1-.88.37z"/></svg></span>',
      },
    })
      .on('show', (event) => {
        const target = $(event.currentTarget);
        target.parent().addClass('_has-value');
      })
      .on('hide', (event) => {
        const target = $(event.currentTarget);
        if (target.val()) {
          target.parent().addClass('_has-value');
        } else {
          target.parent().removeClass('_has-value');
        }
        if (this.control) {
          this.control.control.patchValue(this.element.value);
        }
      });

  }

}
