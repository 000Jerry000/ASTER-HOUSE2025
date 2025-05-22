<?php
/**
 * Image setup and organization functions
 *
 * @package Aster_House
 */

/**
 * Register custom image sizes
 */
function asterhouse_register_image_sizes() {
    // Property images
    add_image_size('property-thumbnail', 600, 400, true);
    add_image_size('property-gallery', 1200, 800, true);
    
    // Work images
    add_image_size('work-thumbnail', 600, 400, true);
    add_image_size('work-gallery', 1200, 800, true);
    
    // News images
    add_image_size('news-thumbnail', 400, 300, true);
    add_image_size('news-featured', 800, 600, true);
    
    // Staff images
    add_image_size('staff-thumbnail', 300, 300, true);
}
add_action('after_setup_theme', 'asterhouse_register_image_sizes');

/**
 * Get image path helper function
 */
function asterhouse_get_image_path($filename) {
    return get_template_directory_uri() . '/assets/images/' . $filename;
}

/**
 * Get icon path helper function
 */
function asterhouse_get_icon_path($filename) {
    return get_template_directory_uri() . '/assets/images/icons/' . $filename;
}

/**
 * Get logo path helper function
 */
function asterhouse_get_logo_path($filename) {
    return get_template_directory_uri() . '/assets/images/logos/' . $filename;
}

/**
 * Get animation path helper function
 */
function asterhouse_get_animation_path($filename) {
    return get_template_directory_uri() . '/assets/images/animations/' . $filename;
}

/**
 * Get background path helper function
 */
function asterhouse_get_background_path($filename) {
    return get_template_directory_uri() . '/assets/images/backgrounds/' . $filename;
}

/**
 * Get staff image path helper function
 */
function asterhouse_get_staff_image_path($filename) {
    return get_template_directory_uri() . '/assets/images/staff/' . $filename;
}

/**
 * Get news image path helper function
 */
function asterhouse_get_news_image_path($filename) {
    return get_template_directory_uri() . '/assets/images/news/' . $filename;
}

/**
 * Get property image path helper function
 */
function asterhouse_get_property_image_path($filename) {
    return get_template_directory_uri() . '/assets/images/properties/' . $filename;
}

/**
 * Get work image path helper function
 */
function asterhouse_get_work_image_path($filename) {
    return get_template_directory_uri() . '/assets/images/works/' . $filename;
} 