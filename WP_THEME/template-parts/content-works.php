<?php
/**
 * Template part for displaying works content
 *
 * @package Aster_House
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class('work-card'); ?>>
    <?php if (has_post_thumbnail()) : ?>
        <div class="work-thumbnail">
            <a href="<?php the_permalink(); ?>">
                <?php the_post_thumbnail('large'); ?>
            </a>
        </div>
    <?php endif; ?>

    <div class="work-content">
        <header class="work-header">
            <?php the_title('<h2 class="work-title"><a href="' . esc_url(get_permalink()) . '" rel="bookmark">', '</a></h2>'); ?>
            
            <div class="work-meta">
                <?php
                $client = get_post_meta(get_the_ID(), '_work_client', true);
                if ($client) :
                    ?>
                    <span class="work-client"><?php echo esc_html($client); ?></span>
                <?php endif; ?>

                <?php
                $date = get_post_meta(get_the_ID(), '_work_date', true);
                if ($date) :
                    ?>
                    <span class="work-date"><?php echo esc_html($date); ?></span>
                <?php endif; ?>
            </div>
        </header>

        <div class="work-details">
            <?php
            $location = get_post_meta(get_the_ID(), '_work_location', true);
            $size = get_post_meta(get_the_ID(), '_work_size', true);
            ?>
            <ul class="work-features">
                <?php if ($location) : ?>
                    <li class="location"><?php echo esc_html($location); ?></li>
                <?php endif; ?>
                <?php if ($size) : ?>
                    <li class="size"><?php echo esc_html($size); ?></li>
                <?php endif; ?>
            </ul>
        </div>

        <div class="work-excerpt">
            <?php the_excerpt(); ?>
        </div>

        <footer class="work-footer">
            <a href="<?php the_permalink(); ?>" class="read-more"><?php esc_html_e('View Details', 'asterhouse'); ?></a>
        </footer>
    </div>
</article> 