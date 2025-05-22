jQuery(function($) {
    // Loading animation
    $(window).on('load', function() {
        setTimeout(function() {
            $('#loadingWrap').removeClass('on');
            $('body').removeClass('loading');
            $('#loadingTopBorder').addClass('active');
            
            // Start top animation after loading
            setTimeout(function() {
                $('#topAnimeBgWrap').addClass('active');
            }, 500);
        }, 1000);
    });

    // Scroll animation for top section
    $(window).on('scroll', function() {
        var scrollTop = $(window).scrollTop();
        var topAnimeScroll = $('#topAnimeScroll');
        
        if (scrollTop > 100) {
            topAnimeScroll.addClass('active');
            $('.header__top').addClass('scrolled');
        } else {
            topAnimeScroll.removeClass('active');
            $('.header__top').removeClass('scrolled');
        }
    });

    // Fade animations for elements
    function fadeInElements() {
        $('.fadeIn').each(function() {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('visible');
            }
        });
    }

    // Initial check for elements in viewport
    fadeInElements();

    // Check for elements in viewport on scroll
    $(window).on('scroll', function() {
        fadeInElements();
    });

    // Smooth scroll for anchor links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        var target = $(this.hash);
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 800);
        }
    });

    // Initialize property slider if exists
    if ($('.sell__card.slider').length) {
        $('.sell__card.slider').slick({
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
    }
}); 