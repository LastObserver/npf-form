import $ from 'jquery'

(() => {
  $('._js_header-links').slick({
    mobileFirst: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    arrows: false,
    swipeToSlide: true,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 799,
        settings: 'unslick',
      },
    ],
  })

  const $currentNavItem = $('.npf-header-banner__link._current')
  const $toggledSlide = $currentNavItem.attr('data-slick-index')

  $('._js_header-links').slick('slickGoTo', $toggledSlide)
})()
