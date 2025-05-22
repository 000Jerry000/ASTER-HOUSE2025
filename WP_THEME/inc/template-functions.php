<?php
/**
 * Functions which enhance the theme by hooking into WordPress
 */

/**
 * Add a pingback url auto-discovery header for single posts, pages, or attachments.
 */
function asterhouse_pingback_header() {
    if (is_singular() && pings_open()) {
        printf('<link rel="pingback" href="%s">', esc_url(get_bloginfo('pingback_url')));
    }
}
add_action('wp_head', 'asterhouse_pingback_header');

/**
 * Add custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 * @return array
 */
function asterhouse_body_classes($classes) {
    // Adds a class of hfeed to non-singular pages.
    if (!is_singular()) {
        $classes[] = 'hfeed';
    }

    // Adds a class of no-sidebar when there is no sidebar present.
    if (!is_active_sidebar('sidebar-1')) {
        $classes[] = 'no-sidebar';
    }

    return $classes;
}
add_filter('body_class', 'asterhouse_body_classes');

/**
 * Add custom classes to the array of post classes.
 *
 * @param array $classes Classes for the post element.
 * @return array
 */
function asterhouse_post_classes($classes) {
    if (is_singular()) {
        $classes[] = 'single';
    }
    return $classes;
}
add_filter('post_class', 'asterhouse_post_classes');

/**
 * Custom excerpt length
 */
function asterhouse_custom_excerpt_length($length) {
    return 20;
}
add_filter('excerpt_length', 'asterhouse_custom_excerpt_length');

/**
 * Custom excerpt more
 */
function asterhouse_custom_excerpt_more($more) {
    return '...';
}
add_filter('excerpt_more', 'asterhouse_custom_excerpt_more');

/**
 * Add custom image sizes
 */
function asterhouse_custom_image_sizes() {
    add_image_size('property-thumbnail', 400, 300, true);
    add_image_size('property-gallery', 800, 600, true);
    add_image_size('work-thumbnail', 400, 300, true);
    add_image_size('work-gallery', 800, 600, true);
}
add_action('after_setup_theme', 'asterhouse_custom_image_sizes'); 