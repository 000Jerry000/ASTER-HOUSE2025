<?php
/**
 * The template for displaying property archives
 *
 * @package Aster_House
 */

get_header();
?>

<main id="primary" class="site-main">
    <header class="page-header">
        <?php
        if (is_tax('property_category')) {
            single_term_title('<h1 class="page-title">', '</h1>');
            the_archive_description('<div class="archive-description">', '</div>');
        } else {
            echo '<h1 class="page-title">' . esc_html__('Properties', 'asterhouse') . '</h1>';
        }
        ?>
    </header>

    <?php if (have_posts()) : ?>
        <div class="property-grid">
            <?php while (have_posts()) : the_post(); ?>
                <article id="post-<?php the_ID(); ?>" <?php post_class('property-item'); ?>>
                    <?php if (has_post_thumbnail()) : ?>
                        <div class="property-thumbnail">
                            <a href="<?php the_permalink(); ?>">
                                <?php the_post_thumbnail('large'); ?>
                            </a>
                        </div>
                    <?php endif; ?>

                    <div class="property-content">
                        <header class="entry-header">
                            <?php the_title('<h2 class="entry-title"><a href="' . esc_url(get_permalink()) . '">', '</a></h2>'); ?>
                            
                            <div class="property-meta">
                                <?php
                                $price = get_post_meta(get_the_ID(), '_property_price', true);
                                $location = get_post_meta(get_the_ID(), '_property_location', true);
                                $bedrooms = get_post_meta(get_the_ID(), '_property_bedrooms', true);
                                $bathrooms = get_post_meta(get_the_ID(), '_property_bathrooms', true);
                                $area = get_post_meta(get_the_ID(), '_property_area', true);
                                ?>

                                <?php if ($price) : ?>
                                    <span class="property-price"><?php echo esc_html($price); ?></span>
                                <?php endif; ?>

                                <?php if ($location) : ?>
                                    <span class="property-location"><?php echo esc_html($location); ?></span>
                                <?php endif; ?>

                                <div class="property-details">
                                    <?php if ($bedrooms) : ?>
                                        <span class="property-bedrooms">
                                            <i class="fas fa-bed"></i> <?php echo esc_html($bedrooms); ?>
                                        </span>
                                    <?php endif; ?>

                                    <?php if ($bathrooms) : ?>
                                        <span class="property-bathrooms">
                                            <i class="fas fa-bath"></i> <?php echo esc_html($bathrooms); ?>
                                        </span>
                                    <?php endif; ?>

                                    <?php if ($area) : ?>
                                        <span class="property-area">
                                            <i class="fas fa-ruler-combined"></i> <?php echo esc_html($area); ?>
                                        </span>
                                    <?php endif; ?>
                                </div>
                            </div>
                        </header>

                        <div class="entry-content">
                            <?php the_excerpt(); ?>
                        </div>

                        <footer class="entry-footer">
                            <a href="<?php the_permalink(); ?>" class="read-more"><?php esc_html_e('View Details', 'asterhouse'); ?></a>
                        </footer>
                    </div>
                </article>
            <?php endwhile; ?>
        </div>

        <?php
        the_posts_pagination(array(
            'prev_text' => '<span class="nav-prev">' . esc_html__('Previous', 'asterhouse') . '</span>',
            'next_text' => '<span class="nav-next">' . esc_html__('Next', 'asterhouse') . '</span>',
        ));
        ?>

    <?php else : ?>
        <?php get_template_part('template-parts/content', 'none'); ?>
    <?php endif; ?>
</main>

<?php
get_sidebar();
get_footer(); 