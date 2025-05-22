<?php
/**
 * The template for displaying single work posts
 *
 * @package Aster_House
 */

get_header();
?>

<main id="primary" class="site-main">
    <?php while (have_posts()) : the_post(); ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
            <header class="entry-header">
                <?php the_title('<h1 class="entry-title">', '</h1>'); ?>

                <div class="work-meta">
                    <?php
                    $client = get_post_meta(get_the_ID(), '_work_client', true);
                    $date = get_post_meta(get_the_ID(), '_work_date', true);
                    $location = get_post_meta(get_the_ID(), '_work_location', true);
                    $size = get_post_meta(get_the_ID(), '_work_size', true);
                    ?>

                    <?php if ($client) : ?>
                        <span class="work-client">
                            <i class="fas fa-user"></i> <?php echo esc_html($client); ?>
                        </span>
                    <?php endif; ?>

                    <?php if ($date) : ?>
                        <span class="work-date">
                            <i class="fas fa-calendar"></i> <?php echo esc_html($date); ?>
                        </span>
                    <?php endif; ?>

                    <?php if ($location) : ?>
                        <span class="work-location">
                            <i class="fas fa-map-marker-alt"></i> <?php echo esc_html($location); ?>
                        </span>
                    <?php endif; ?>

                    <?php if ($size) : ?>
                        <span class="work-size">
                            <i class="fas fa-ruler-combined"></i> <?php echo esc_html($size); ?>
                        </span>
                    <?php endif; ?>
                </div>
            </header>

            <?php if (has_post_thumbnail()) : ?>
                <div class="work-gallery">
                    <div class="work-main-image">
                        <?php the_post_thumbnail('full'); ?>
                    </div>
                    <?php
                    $gallery_images = get_post_meta(get_the_ID(), '_work_gallery', true);
                    if ($gallery_images) : ?>
                        <div class="work-thumbnails">
                            <?php foreach ($gallery_images as $image_id) : ?>
                                <div class="work-thumbnail">
                                    <?php echo wp_get_attachment_image($image_id, 'medium'); ?>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    <?php endif; ?>
                </div>
            <?php endif; ?>

            <div class="work-content">
                <div class="entry-content">
                    <?php
                    the_content();

                    wp_link_pages(array(
                        'before' => '<div class="page-links">' . esc_html__('Pages:', 'asterhouse'),
                        'after'  => '</div>',
                    ));
                    ?>
                </div>

                <div class="work-features">
                    <?php
                    $features = get_the_terms(get_the_ID(), 'work_feature');
                    if ($features && !is_wp_error($features)) : ?>
                        <h3><?php esc_html_e('Features', 'asterhouse'); ?></h3>
                        <ul class="feature-list">
                            <?php foreach ($features as $feature) : ?>
                                <li>
                                    <i class="fas fa-check"></i>
                                    <?php echo esc_html($feature->name); ?>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                    <?php endif; ?>
                </div>

                <div class="work-categories">
                    <?php
                    $categories = get_the_terms(get_the_ID(), 'work_category');
                    if ($categories && !is_wp_error($categories)) : ?>
                        <h3><?php esc_html_e('Categories', 'asterhouse'); ?></h3>
                        <div class="category-list">
                            <?php foreach ($categories as $category) : ?>
                                <a href="<?php echo esc_url(get_term_link($category)); ?>" class="category-link">
                                    <?php echo esc_html($category->name); ?>
                                </a>
                            <?php endforeach; ?>
                        </div>
                    <?php endif; ?>
                </div>
            </div>

            <footer class="entry-footer">
                <?php
                // Previous/next post navigation.
                the_post_navigation(array(
                    'prev_text' => '<span class="nav-subtitle">' . esc_html__('Previous:', 'asterhouse') . '</span> <span class="nav-title">%title</span>',
                    'next_text' => '<span class="nav-subtitle">' . esc_html__('Next:', 'asterhouse') . '</span> <span class="nav-title">%title</span>',
                ));
                ?>
            </footer>
        </article>

        <?php
        // If comments are open or we have at least one comment, load up the comment template.
        if (comments_open() || get_comments_number()) :
            comments_template();
        endif;
        ?>

    <?php endwhile; ?>
</main>

<?php
get_sidebar();
get_footer(); 