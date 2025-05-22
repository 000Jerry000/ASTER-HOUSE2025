<?php
/**
 * Property meta box functionality
 */

if (!defined('ABSPATH')) exit;

/**
 * Add meta box for property details
 */
function asterhouse_add_property_meta_box() {
    add_meta_box(
        'property_details',
        __('Property Details', 'asterhouse'),
        'asterhouse_property_meta_box_callback',
        'property',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'asterhouse_add_property_meta_box');

/**
 * Meta box callback function
 */
function asterhouse_property_meta_box_callback($post) {
    // Add nonce for security
    wp_nonce_field('asterhouse_property_meta_box', 'asterhouse_property_meta_box_nonce');

    // Get existing values
    $price = get_post_meta($post->ID, 'property_price', true);
    $location = get_post_meta($post->ID, 'property_location', true);
    $bedrooms = get_post_meta($post->ID, 'property_bedrooms', true);
    $bathrooms = get_post_meta($post->ID, 'property_bathrooms', true);
    $area = get_post_meta($post->ID, 'property_area', true);
    $gallery = get_post_meta($post->ID, 'property_gallery', true);
    ?>
    <div class="property-meta-fields">
        <p>
            <label for="property_price"><?php esc_html_e('Price:', 'asterhouse'); ?></label>
            <input type="text" id="property_price" name="property_price" value="<?php echo esc_attr($price); ?>" class="widefat">
        </p>

        <p>
            <label for="property_location"><?php esc_html_e('Location:', 'asterhouse'); ?></label>
            <input type="text" id="property_location" name="property_location" value="<?php echo esc_attr($location); ?>" class="widefat">
        </p>

        <p>
            <label for="property_bedrooms"><?php esc_html_e('Bedrooms:', 'asterhouse'); ?></label>
            <input type="number" id="property_bedrooms" name="property_bedrooms" value="<?php echo esc_attr($bedrooms); ?>" class="small-text">
        </p>

        <p>
            <label for="property_bathrooms"><?php esc_html_e('Bathrooms:', 'asterhouse'); ?></label>
            <input type="number" id="property_bathrooms" name="property_bathrooms" value="<?php echo esc_attr($bathrooms); ?>" class="small-text">
        </p>

        <p>
            <label for="property_area"><?php esc_html_e('Area:', 'asterhouse'); ?></label>
            <input type="text" id="property_area" name="property_area" value="<?php echo esc_attr($area); ?>" class="widefat">
        </p>

        <p>
            <label for="property_gallery"><?php esc_html_e('Gallery Images:', 'asterhouse'); ?></label>
            <input type="hidden" id="property_gallery" name="property_gallery" value="<?php echo esc_attr($gallery); ?>">
            <div class="gallery-preview">
                <?php
                if ($gallery) {
                    $gallery_array = explode(',', $gallery);
                    foreach ($gallery_array as $image_id) {
                        echo wp_get_attachment_image($image_id, 'thumbnail');
                    }
                }
                ?>
            </div>
            <button type="button" class="button" id="upload_gallery_button"><?php esc_html_e('Add Images', 'asterhouse'); ?></button>
        </p>
    </div>

    <script>
    jQuery(document).ready(function($) {
        // Gallery upload functionality
        $('#upload_gallery_button').click(function(e) {
            e.preventDefault();
            var gallery_frame = wp.media({
                title: '<?php esc_html_e('Select Gallery Images', 'asterhouse'); ?>',
                button: {
                    text: '<?php esc_html_e('Use these images', 'asterhouse'); ?>'
                },
                multiple: true
            });

            gallery_frame.on('select', function() {
                var attachments = gallery_frame.state().get('selection').map(
                    function(attachment) {
                        attachment = attachment.toJSON();
                        return attachment.id;
                    }
                );
                $('#property_gallery').val(attachments.join(','));
                updateGalleryPreview(attachments);
            });

            gallery_frame.open();
        });

        function updateGalleryPreview(attachment_ids) {
            var preview = $('.gallery-preview');
            preview.empty();
            attachment_ids.forEach(function(id) {
                $.ajax({
                    url: ajaxurl,
                    type: 'POST',
                    data: {
                        action: 'get_attachment_url',
                        attachment_id: id
                    },
                    success: function(response) {
                        preview.append('<img src="' + response + '" alt="">');
                    }
                });
            });
        }
    });
    </script>
    <?php
}

/**
 * Save property meta box data
 */
function asterhouse_save_property_meta_box_data($post_id) {
    // Check if nonce is set
    if (!isset($_POST['asterhouse_property_meta_box_nonce'])) {
        return;
    }

    // Verify nonce
    if (!wp_verify_nonce($_POST['asterhouse_property_meta_box_nonce'], 'asterhouse_property_meta_box')) {
        return;
    }

    // If this is an autosave, don't do anything
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    // Check user permissions
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    // Save meta box data
    $fields = array(
        'property_price',
        'property_location',
        'property_bedrooms',
        'property_bathrooms',
        'property_area',
        'property_gallery'
    );

    foreach ($fields as $field) {
        if (isset($_POST[$field])) {
            update_post_meta($post_id, $field, sanitize_text_field($_POST[$field]));
        }
    }
}
add_action('save_post_property', 'asterhouse_save_property_meta_box_data');

/**
 * AJAX handler for getting attachment URL
 */
function asterhouse_get_attachment_url() {
    if (!isset($_POST['attachment_id'])) {
        wp_send_json_error();
    }

    $attachment_id = intval($_POST['attachment_id']);
    $url = wp_get_attachment_thumb_url($attachment_id);

    if ($url) {
        wp_send_json_success($url);
    } else {
        wp_send_json_error();
    }
}
add_action('wp_ajax_get_attachment_url', 'asterhouse_get_attachment_url'); 