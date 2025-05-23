<?php
/**
 * Template part for displaying property content
 *
 * @package Aster_House
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class('property-card'); ?>>
    <?php if (has_post_thumbnail()) : ?>
        <div class="property-thumbnail">
            <a href="<?php the_permalink(); ?>">
                <?php the_post_thumbnail('large'); ?>
            </a>
        </div>
    <?php endif; ?>

    <div class="property-content">
        <header class="property-header">
            <?php the_title('<h2 class="property-title"><a href="' . esc_url(get_permalink()) . '" rel="bookmark">', '</a></h2>'); ?>
            
            <div class="property-meta">
                <?php
                $price = get_post_meta(get_the_ID(), '_property_price', true);
                if ($price) :
                    ?>
                    <span class="property-price"><?php echo esc_html($price); ?></span>
                <?php endif; ?>

                <?php
                $location = get_post_meta(get_the_ID(), '_property_location', true);
                if ($location) :
                    ?>
                    <span class="property-location"><?php echo esc_html($location); ?></span>
                <?php endif; ?>
            </div>
        </header>

        <div class="property-details">
            <?php
            $bedrooms = get_post_meta(get_the_ID(), '_property_bedrooms', true);
            $bathrooms = get_post_meta(get_the_ID(), '_property_bathrooms', true);
            $area = get_post_meta(get_the_ID(), '_property_area', true);
            ?>
            <ul class="property-features">
                <?php if ($bedrooms) : ?>
                    <li class="bedrooms"><?php echo esc_html($bedrooms); ?> <?php esc_html_e('Bedrooms', 'asterhouse'); ?></li>
                <?php endif; ?>
                <?php if ($bathrooms) : ?>
                    <li class="bathrooms"><?php echo esc_html($bathrooms); ?> <?php esc_html_e('Bathrooms', 'asterhouse'); ?></li>
                <?php endif; ?>
                <?php if ($area) : ?>
                    <li class="area"><?php echo esc_html($area); ?> <?php esc_html_e('sq ft', 'asterhouse'); ?></li>
                <?php endif; ?>
            </ul>
        </div>

        <div class="property-excerpt">
            <?php the_excerpt(); ?>
        </div>

        <footer class="property-footer">
            <a href="<?php the_permalink(); ?>" class="read-more"><?php esc_html_e('View Details', 'asterhouse'); ?></a>
        </footer>
    </div>
</article> 