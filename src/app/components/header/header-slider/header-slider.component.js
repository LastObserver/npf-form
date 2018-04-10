import $ from 'jquery'
import slick from 'slick-carousel'
import { TweenMax } from 'gsap'

(() => {
  const circleGreen = $('._js-circle._theme_green')
  const circleOrange = $('._js-circle._theme_orange')

  $('.npf-header-slide').on('mousemove', (e) => {
    const offsetX = 100 / $(window).width()
    const offsetY = 50 / $(window).height()

    TweenMax.to(circleGreen, 0.25, {
      x: -e.originalEvent.clientX * offsetX,
      y: e.originalEvent.clientY * offsetY,
    })

    TweenMax.to(circleOrange, 0.25, {
      x: e.originalEvent.clientX * offsetX,
      y: -e.originalEvent.clientY * offsetY,
    })
  })

  if ($('.npf-js-header-slider').length) {
    const headerContainer = $('.npf-js-header-slider')

    headerContainer.slick({
      mobile: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      arrows: false,
    })
  }
})()
