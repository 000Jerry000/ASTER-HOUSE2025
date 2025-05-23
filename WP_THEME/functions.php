<?php
/**
 * Aster House functions and definitions
 */

if (!defined('_S_VERSION')) {
    define('_S_VERSION', '1.0.0');
}

/**
 * Theme Setup
 */
function asterhouse_setup() {
    // Add default posts and comments RSS feed links to head
    add_theme_support('automatic-feed-links');

    // Let WordPress manage the document title
    add_theme_support('title-tag');

    // Enable support for Post Thumbnails on posts and pages
    add_theme_support('post-thumbnails');

    // Register navigation menus
    register_nav_menus(array(
        'primary' => esc_html__('Primary Menu', 'asterhouse'),
        'footer' => esc_html__('Footer Menu', 'asterhouse'),
    ));

    // Switch default core markup to output valid HTML5
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ));

    // Add theme support for selective refresh for widgets
    add_theme_support('customize-selective-refresh-widgets');

    // Add support for custom logo
    add_theme_support('custom-logo', array(
        'height'      => 250,
        'width'       => 250,
        'flex-width'  => true,
        'flex-height' => true,
    ));
}
add_action('after_setup_theme', 'asterhouse_setup');

/**
 * Enqueue scripts and styles
 */
function asterhouse_scripts() {
    // Enqueue styles
    wp_enqueue_style('asterhouse-reset', get_template_directory_uri() . '/assets/css/reset.css', array(), _S_VERSION);
    wp_enqueue_style('asterhouse-common', get_template_directory_uri() . '/assets/css/common.css', array(), _S_VERSION);
    wp_enqueue_style('asterhouse-style', get_template_directory_uri() . '/assets/css/style.css', array(), _S_VERSION);
    wp_enqueue_style('asterhouse-tab', get_template_directory_uri() . '/assets/css/tab.css', array(), _S_VERSION);
    wp_enqueue_style('asterhouse-sp', get_template_directory_uri() . '/assets/css/sp.css', array(), _S_VERSION);
    wp_enqueue_style('asterhouse-animation', get_template_directory_uri() . '/assets/css/animation.css', array(), _S_VERSION);

    // Google Fonts
    wp_enqueue_style('google-fonts-roboto', 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap', array(), null);
    wp_enqueue_style('google-fonts-noto-sans', 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;600&display=swap', array(), null);
    
    // Adobe Fonts
    wp_enqueue_style('adobe-fonts', 'https://use.typekit.net/abg4zef.css', array(), null);

    // jQuery (ensure it's loaded in header)
    wp_enqueue_script('jquery');

    // Theme scripts (load in footer)
    wp_enqueue_script('asterhouse-script', get_template_directory_uri() . '/assets/js/script.js', array('jquery'), _S_VERSION, true);
    wp_enqueue_script('asterhouse-index', get_template_directory_uri() . '/assets/js/index.js', array('jquery', 'asterhouse-script'), _S_VERSION, true);
    
    // Lottie Player
    wp_enqueue_script('lottie-player', 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js', array(), null, true);

    if (is_singular() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }
}
add_action('wp_enqueue_scripts', 'asterhouse_scripts');

/**
 * Custom template tags for this theme
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Custom menu walker class
 */
require get_template_directory() . '/inc/class-aster-house-menu-walker.php';

/**
 * Load Jetpack compatibility file
 */
if (defined('JETPACK__VERSION')) {
    require get_template_directory() . '/inc/jetpack.php';
}

/**
 * Register widget area
 */
function asterhouse_widgets_init() {
    register_sidebar(array(
        'name'          => esc_html__('Sidebar', 'asterhouse'),
        'id'            => 'sidebar-1',
        'description'   => esc_html__('Add widgets here.', 'asterhouse'),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ));
}
add_action('widgets_init', 'asterhouse_widgets_init');

/**
 * Custom Post Types
 */
function asterhouse_register_post_types() {
    // Sell Properties
    register_post_type('sell', array(
        'labels' => array(
            'name' => __('Sell Properties', 'asterhouse'),
            'singular_name' => __('Sell Property', 'asterhouse'),
        ),
        'public' => true,
        'has_archive' => true,
        'menu_icon' => 'dashicons-building',
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
        'rewrite' => array('slug' => 'sell'),
    ));

    // Works
    register_post_type('works', array(
        'labels' => array(
            'name' => __('Works', 'asterhouse'),
            'singular_name' => __('Work', 'asterhouse'),
        ),
        'public' => true,
        'has_archive' => true,
        'menu_icon' => 'dashicons-portfolio',
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
        'rewrite' => array('slug' => 'works'),
    ));
}
add_action('init', 'asterhouse_register_post_types');

/**
 * Custom Taxonomies
 */
function asterhouse_register_taxonomies() {
    // Property Categories
    register_taxonomy('property_category', 'sell', array(
        'labels' => array(
            'name' => __('Property Categories', 'asterhouse'),
            'singular_name' => __('Property Category', 'asterhouse'),
        ),
        'hierarchical' => true,
        'show_admin_column' => true,
        'rewrite' => array('slug' => 'property-category'),
    ));

    // Work Categories
    register_taxonomy('work_category', 'works', array(
        'labels' => array(
            'name' => __('Work Categories', 'asterhouse'),
            'singular_name' => __('Work Category', 'asterhouse'),
        ),
        'hierarchical' => true,
        'show_admin_column' => true,
        'rewrite' => array('slug' => 'work-category'),
    ));
}
add_action('init', 'asterhouse_register_taxonomies'); 