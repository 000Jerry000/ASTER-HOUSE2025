<?php
/**
 * Works meta box functionality
 */

if (!defined('ABSPATH')) exit;

/**
 * Add meta box for work details
 */
function asterhouse_add_work_meta_box() {
    add_meta_box(
        'work_details',
        __('Work Details', 'asterhouse'),
        'asterhouse_work_meta_box_callback',
        'works',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'asterhouse_add_work_meta_box');

/**
 * Meta box callback function
 */
function asterhouse_work_meta_box_callback($post) {
    // Add nonce for security
    wp_nonce_field('asterhouse_work_meta_box', 'asterhouse_work_meta_box_nonce');

    // Get existing values
    $client = get_post_meta($post->ID, 'work_client', true);
    $date = get_post_meta($post->ID, 'work_date', true);
    $location = get_post_meta($post->ID, 'work_location', true);
    $size = get_post_meta($post->ID, 'work_size', true);
    $gallery = get_post_meta($post->ID, 'work_gallery', true);
    ?>
    <div class="work-meta-fields">
        <p>
            <label for="work_client"><?php esc_html_e('Client:', 'asterhouse'); ?></label>
            <input type="text" id="work_client" name="work_client" value="<?php echo esc_attr($client); ?>" class="widefat">
        </p>

        <p>
            <label for="work_date"><?php esc_html_e('Date:', 'asterhouse'); ?></label>
            <input type="text" id="work_date" name="work_date" value="<?php echo esc_attr($date); ?>" class="widefat">
        </p>

        <p>
            <label for="work_location"><?php esc_html_e('Location:', 'asterhouse'); ?></label>
            <input type="text" id="work_location" name="work_location" value="<?php echo esc_attr($location); ?>" class="widefat">
        </p>

        <p>
            <label for="work_size"><?php esc_html_e('Size:', 'asterhouse'); ?></label>
            <input type="text" id="work_size" name="work_size" value="<?php echo esc_attr($size); ?>" class="widefat">
        </p>

        <p>
            <label for="work_gallery"><?php esc_html_e('Gallery Images:', 'asterhouse'); ?></label>
            <input type="hidden" id="work_gallery" name="work_gallery" value="<?php echo esc_attr($gallery); ?>">
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
                $('#work_gallery').val(attachments.join(','));
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
 * Save work meta box data
 */
function asterhouse_save_work_meta_box_data($post_id) {
    // Check if nonce is set
    if (!isset($_POST['asterhouse_work_meta_box_nonce'])) {
        return;
    }

    // Verify nonce
    if (!wp_verify_nonce($_POST['asterhouse_work_meta_box_nonce'], 'asterhouse_work_meta_box')) {
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
        'work_client',
        'work_date',
        'work_location',
        'work_size',
        'work_gallery'
    );

    foreach ($fields as $field) {
        if (isset($_POST[$field])) {
            update_post_meta($post_id, $field, sanitize_text_field($_POST[$field]));
        }
    }
}
add_action('save_post_works', 'asterhouse_save_work_meta_box_data'); 