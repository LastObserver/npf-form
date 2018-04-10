import $ from 'jquery'

(() => {
  $('._js-carousel-search-cards').slick({
    mobileFirst: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    arrows: false,
    swipeToSlide: true,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1199,
        settings: 'unslick',
      },
    ],
  })

  $('.search-link').on('click', (e) => {
    e.preventDefault()
    $('.npf-header-search').addClass('_show')
  })

  $('.npf-header-search__close').on('click', (e) => {
    e.preventDefault()
    $('.npf-header-search').removeClass('_show')
  })

  $('.npf-header-search__input-container form').on('submit', function (e) {
		let $input = $('input[name="q"]', $(this));
		if($input.val() == '') {
			$(this).closest('.npf-header-search__input-container').addClass('_none');
			return false;
		} else {
			$(this).closest('.npf-header-search__input-container').removeClass('_none');
		}
  })
})()
