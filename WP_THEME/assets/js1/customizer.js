/* global wp, jQuery */
/**
 * File customizer.js.
 *
 * Theme Customizer enhancements for a better user experience.
 *
 * Contains handlers to make Theme Customizer preview reload changes asynchronously.
 */

(function($) {
    // Site title and description.
    wp.customize('blogname', function(value) {
        value.bind(function(to) {
            $('.site-title a').text(to);
        });
    });
    wp.customize('blogdescription', function(value) {
        value.bind(function(to) {
            $('.site-description').text(to);
        });
    });

    // Header text color.
    wp.customize('header_textcolor', function(value) {
        value.bind(function(to) {
            if ('blank' === to) {
                $('.site-title, .site-description').css({
                    clip: 'rect(1px, 1px, 1px, 1px)',
                    position: 'absolute'
                });
            } else {
                $('.site-title, .site-description').css({
                    clip: 'auto',
                    position: 'relative'
                });
                $('.site-title a, .site-description').css({
                    color: to
                });
            }
        });
    });

    // Contact Information
    wp.customize('asterhouse_phone', function(value) {
        value.bind(function(to) {
            $('.tel .roboto span:last-child').text(to);
        });
    });

    // Social Media URLs
    wp.customize('asterhouse_youtube', function(value) {
        value.bind(function(to) {
            $('.sns a[href*="youtube"]').attr('href', to);
            $('.header__top__sns a[href*="youtube"]').attr('href', to);
        });
    });

    wp.customize('asterhouse_instagram', function(value) {
        value.bind(function(to) {
            $('.sns a[href*="instagram"]').attr('href', to);
            $('.header__top__sns a[href*="instagram"]').attr('href', to);
        });
    });

    wp.customize('asterhouse_facebook', function(value) {
        value.bind(function(to) {
            $('.sns a[href*="facebook"]').attr('href', to);
            $('.header__top__sns a[href*="facebook"]').attr('href', to);
        });
    });

    wp.customize('asterhouse_tiktok', function(value) {
        value.bind(function(to) {
            $('.sns a[href*="tiktok"]').attr('href', to);
            $('.header__top__sns a[href*="tiktok"]').attr('href', to);
        });
    });
})(jQuery); 