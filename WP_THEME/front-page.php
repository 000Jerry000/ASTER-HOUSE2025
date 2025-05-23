<?php
/**
 * The template for displaying the front page
 *
 * @package Aster_House
 */

get_header();
?>

<main id="primary" class="site-main">
    <!-- Properties section -->
    <article>
        <div class="ttl__top fadeIn">
            <h2 class="fadeUp">Sell<span>販売中物件・土地情報</span></h2>
            <div class="btn__more fr mt25 fadeUp"><a href="<?php echo get_post_type_archive_link('property'); ?>">More</a></div>
        </div>
        <div class="top__card_wrapper fadeIn">
            <div class="sell__card slider">
                <ul class="slide-track">
                    <?php
                    $properties = new WP_Query(array(
                        'post_type' => 'property',
                        'posts_per_page' => 6,
                        'orderby' => 'date',
                        'order' => 'DESC'
                    ));

                    if ($properties->have_posts()) :
                        while ($properties->have_posts()) : $properties->the_post();
                            $property_code = get_post_meta(get_the_ID(), 'property_code', true);
                            $property_type = get_post_meta(get_the_ID(), 'property_type', true);
                            $property_location = get_post_meta(get_the_ID(), 'property_location', true);
                            $property_price = get_post_meta(get_the_ID(), 'property_price', true);
                    ?>
                            <li>
                                <a href="<?php the_permalink(); ?>">
                                    <div class="code"><?php echo esc_html($property_code); ?></div>
                                    <div class="scale"><?php echo esc_html($property_type); ?>　｜　<span><?php echo esc_html($property_location); ?></span></div>
                                    <div class="thumbnail">
                                        <?php if (has_post_thumbnail()) : ?>
                                            <?php the_post_thumbnail('property-thumbnail'); ?>
                                        <?php endif; ?>
                                    </div>
                                    <h3><?php the_title(); ?></h3>
                                    <div class="build">
                                        <img src="<?php echo get_template_directory_uri(); ?>/assets/img/icon_sell_build.svg" alt="建売">
                                        <p class="price roboto"><?php echo esc_html($property_price); ?><span>万円</span></p>
                                    </div>
                                </a>
                            </li>
                    <?php
                        endwhile;
                        wp_reset_postdata();
                    endif;
                    ?>
                </ul>
            </div>
        </div>
    </article>

    <!-- Add other sections here -->
</main>

<?php
get_footer(); 