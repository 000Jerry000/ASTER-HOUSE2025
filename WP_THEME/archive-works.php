<?php
/**
 * The template for displaying works archives
 *
 * @package Aster_House
 */

get_header();
?>

<main id="primary" class="site-main">
    <header class="page-header">
        <?php
        if (is_tax('work_category')) {
            single_term_title('<h1 class="page-title">', '</h1>');
            the_archive_description('<div class="archive-description">', '</div>');
        } else {
            echo '<h1 class="page-title">' . esc_html__('Works', 'asterhouse') . '</h1>';
        }
        ?>
    </header>

    <?php if (have_posts()) : ?>
        <div class="works-grid">
            <?php while (have_posts()) : the_post(); ?>
                <article id="post-<?php the_ID(); ?>" <?php post_class('work-item'); ?>>
                    <?php if (has_post_thumbnail()) : ?>
                        <div class="work-thumbnail">
                            <a href="<?php the_permalink(); ?>">
                                <?php the_post_thumbnail('large'); ?>
                            </a>
                        </div>
                    <?php endif; ?>

                    <div class="work-content">
                        <header class="entry-header">
                            <?php the_title('<h2 class="entry-title"><a href="' . esc_url(get_permalink()) . '">', '</a></h2>'); ?>
                            
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