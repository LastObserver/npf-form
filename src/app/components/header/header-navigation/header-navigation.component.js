import $ from 'jquery';

(() => {
  if ($('.npf-header-navigation').length) {
    const scrolltop = $(window).scrollTop()
    const topnavi = $('.npf-header-navigation').offset().top

    if (scrolltop > topnavi) {
      $('.npf-header-navigation__wrapper').addClass('_fixed')
    } else {
      $('.npf-header-navigation__wrapper').removeClass('_fixed')
    }

    $('.npf-header-navigation__link').on('click', (e) => {
      e.preventDefault()

      const scrollEl = $(e.currentTarget).attr('href')

      $('html, body').animate({ scrollTop: $(scrollEl).offset().top - 90 }, 500)

      return false
    })

    $(window).on('scroll resize', () => {
      const scrolltop = $(window).scrollTop()
      if (scrolltop > topnavi) {
        $('.npf-header-navigation__wrapper').addClass('_fixed')
      } else {
        $('.npf-header-navigation__wrapper').removeClass('_fixed')
      }
    })

    const viewHeight = $(window).height()
    const pageHeight = $(document).height()

    $(window).on('scroll', () => {
      const currentPosition = $(window).scrollTop() + 90

      $('.anchor').each(function() {
        const thisTop = $(this).offset().top
        const height = $(this).height()
        const thisBottom = thisTop + height
        let percent = 0
        const currentHref = `#${$(this).attr('id')}`

        if (currentPosition >= thisTop && currentPosition <= thisBottom) {
          percent = ((currentPosition - thisTop) / height) * 100

          if (currentPosition + viewHeight >= pageHeight) {
            percent = 100
          }

          if (percent > 100) percent = 100
        } else {
          if (currentPosition < thisTop) {
            percent = 0
          }

          if (thisBottom < currentPosition) percent = 100
          if (currentPosition > thisBottom) percent = 100
        }

        $(`a[ href="${currentHref}"]`).next().css({ width: `${percent}%` })
      })
    })
  }
})()
