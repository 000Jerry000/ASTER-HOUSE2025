<?php
/**
 * Aster House Theme Customizer
 */

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function asterhouse_customize_register($wp_customize) {
    $wp_customize->get_setting('blogname')->transport = 'postMessage';
    $wp_customize->get_setting('blogdescription')->transport = 'postMessage';
    $wp_customize->get_setting('header_textcolor')->transport = 'postMessage';

    if (isset($wp_customize->selective_refresh)) {
        $wp_customize->selective_refresh->add_partial(
            'blogname',
            array(
                'selector'        => '.site-title a',
                'render_callback' => 'asterhouse_customize_partial_blogname',
            )
        );
        $wp_customize->selective_refresh->add_partial(
            'blogdescription',
            array(
                'selector'        => '.site-description',
                'render_callback' => 'asterhouse_customize_partial_blogdescription',
            )
        );
    }

    // Add Contact Information Section
    $wp_customize->add_section(
        'asterhouse_contact_info',
        array(
            'title'    => __('Contact Information', 'asterhouse'),
            'priority' => 30,
        )
    );

    // Phone Number
    $wp_customize->add_setting(
        'asterhouse_phone',
        array(
            'default'           => '0120-802-801',
            'sanitize_callback' => 'sanitize_text_field',
        )
    );

    $wp_customize->add_control(
        'asterhouse_phone',
        array(
            'label'    => __('Phone Number', 'asterhouse'),
            'section'  => 'asterhouse_contact_info',
            'type'     => 'text',
        )
    );

    // Social Media Section
    $wp_customize->add_section(
        'asterhouse_social_media',
        array(
            'title'    => __('Social Media', 'asterhouse'),
            'priority' => 40,
        )
    );

    // YouTube URL
    $wp_customize->add_setting(
        'asterhouse_youtube',
        array(
            'default'           => 'https://www.youtube.com/channel/UCoIVR-wyZFAeAOx5vTYoVxw',
            'sanitize_callback' => 'esc_url_raw',
        )
    );

    $wp_customize->add_control(
        'asterhouse_youtube',
        array(
            'label'    => __('YouTube URL', 'asterhouse'),
            'section'  => 'asterhouse_social_media',
            'type'     => 'url',
        )
    );

    // Instagram URL
    $wp_customize->add_setting(
        'asterhouse_instagram',
        array(
            'default'           => 'https://www.instagram.com/__aster_house',
            'sanitize_callback' => 'esc_url_raw',
        )
    );

    $wp_customize->add_control(
        'asterhouse_instagram',
        array(
            'label'    => __('Instagram URL', 'asterhouse'),
            'section'  => 'asterhouse_social_media',
            'type'     => 'url',
        )
    );

    // Facebook URL
    $wp_customize->add_setting(
        'asterhouse_facebook',
        array(
            'default'           => 'https://www.facebook.com/people/%E3%82%A2%E3%82%B9%E3%82%BF%E3%83%BC%E3%83%8F%E3%82%A6%E3%82%B9/100083320001835/',
            'sanitize_callback' => 'esc_url_raw',
        )
    );

    $wp_customize->add_control(
        'asterhouse_facebook',
        array(
            'label'    => __('Facebook URL', 'asterhouse'),
            'section'  => 'asterhouse_social_media',
            'type'     => 'url',
        )
    );

    // TikTok URL
    $wp_customize->add_setting(
        'asterhouse_tiktok',
        array(
            'default'           => '#',
            'sanitize_callback' => 'esc_url_raw',
        )
    );

    $wp_customize->add_control(
        'asterhouse_tiktok',
        array(
            'label'    => __('TikTok URL', 'asterhouse'),
            'section'  => 'asterhouse_social_media',
            'type'     => 'url',
        )
    );
}
add_action('customize_register', 'asterhouse_customize_register');

/**
 * Render the site title for the selective refresh partial.
 */
function asterhouse_customize_partial_blogname() {
    bloginfo('name');
}

/**
 * Render the site tagline for the selective refresh partial.
 */
function asterhouse_customize_partial_blogdescription() {
    bloginfo('description');
}

/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function asterhouse_customize_preview_js() {
    wp_enqueue_script('asterhouse-customizer', get_template_directory_uri() . '/assets/js/customizer.js', array('customize-preview'), _S_VERSION, true);
}
add_action('customize_preview_init', 'asterhouse_customize_preview_js'); 