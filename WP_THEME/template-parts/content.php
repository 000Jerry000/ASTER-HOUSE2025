<?php
/**
 * Template part for displaying posts
 *
 * @package Aster_House
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <header class="entry-header">
        <?php
        if (is_singular()) :
            the_title('<h1 class="entry-title">', '</h1>');
        else :
            the_title('<h2 class="entry-title"><a href="' . esc_url(get_permalink()) . '" rel="bookmark">', '</a></h2>');
        endif;

        if ('post' === get_post_type()) :
            ?>
            <div class="entry-meta">
                <span class="posted-on">
                    <?php echo get_the_date(); ?>
                </span>
                <?php if (has_category()) : ?>
                    <span class="cat-links">
                        <?php the_category(', '); ?>
                    </span>
                <?php endif; ?>
            </div>
        <?php endif; ?>
    </header>

    <?php if (has_post_thumbnail()) : ?>
        <div class="entry-thumbnail">
            <?php if (!is_singular()) : ?>
                <a href="<?php the_permalink(); ?>">
            <?php endif; ?>
                <?php the_post_thumbnail('large'); ?>
            <?php if (!is_singular()) : ?>
                </a>
            <?php endif; ?>
        </div>
    <?php endif; ?>

    <div class="entry-content">
        <?php
        if (is_singular()) :
            the_content(
                sprintf(
                    wp_kses(
                        __('Continue reading<span class="screen-reader-text"> "%s"</span>', 'asterhouse'),
                        array(
                            'span' => array(
                                'class' => array(),
                            ),
                        )
                    ),
                    wp_kses_post(get_the_title())
                )
            );

            wp_link_pages(
                array(
                    'before' => '<div class="page-links">' . esc_html__('Pages:', 'asterhouse'),
                    'after'  => '</div>',
                )
            );
        else :
            the_excerpt();
            ?>
            <a href="<?php the_permalink(); ?>" class="read-more"><?php esc_html_e('Read More', 'asterhouse'); ?></a>
        <?php endif; ?>
    </div>

    <?php if (is_singular()) : ?>
        <footer class="entry-footer">
            <?php
            $tags_list = get_the_tag_list('', esc_html_x(', ', 'list item separator', 'asterhouse'));
            if ($tags_list) {
                printf('<span class="tags-links">' . esc_html__('Tags: %1$s', 'asterhouse') . '</span>', $tags_list);
            }
            ?>
        </footer>
    <?php endif; ?>
</article> 