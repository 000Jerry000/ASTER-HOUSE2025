<?php
/**
 * The template for displaying the front page
 *
 * @package Aster_House
 */

get_header();
?>

<main id="primary" class="site-main">
    <!-- Loading animation -->
    <div class="loading_wrap on" id="loadingWrap">
        <object class="loading-anime" type="image/svg+xml" data="<?php echo get_template_directory_uri(); ?>/assets/img/loading_anime.svg"></object>
    </div>

    <!-- Loading top border animation -->
    <div class="loading_top_border_wrap" id="loadingTopBorder">
        <object class="loading_top_border pc" type="image/svg+xml" data="<?php echo get_template_directory_uri(); ?>/assets/img/top_anime_border_pc.svg"></object>
        <object class="loading_top_border sp" type="image/svg+xml" data="<?php echo get_template_directory_uri(); ?>/assets/img/top_anime_border_sp.svg"></object>
    </div>

    <!-- Top section -->
    <article class="header__top border_none" id="headerTop">
        <!-- Animation background -->
        <div class="top_anime-bg_wrap" id="topAnimeBgWrap">
            <div class="top_anime-text-01 pc"><object type="image/svg+xml" data="<?php echo get_template_directory_uri(); ?>/assets/img/top_anime_text-01_pc.svg"></object></div>
            <div class="top_anime-text-02 pc"><object type="image/svg+xml" data="<?php echo get_template_directory_uri(); ?>/assets/img/top_anime_text-02_pc.svg"></object></div>
            <div class="top_anime-text-03 pc"><object type="image/svg+xml" data="<?php echo get_template_directory_uri(); ?>/assets/img/top_anime_text-03_pc.svg"></object></div>
            <div class="top_anime-text-02 sp"><object type="image/svg+xml" data="<?php echo get_template_directory_uri(); ?>/assets/img/top_anime_text-02_sp.svg"></object></div>
            <div class="top_anime-text-01 sp"><object type="image/svg+xml" data="<?php echo get_template_directory_uri(); ?>/assets/img/top_anime_text-01_sp.svg"></object></div>
            <div class="top_anime-text-03 sp"><object type="image/svg+xml" data="<?php echo get_template_directory_uri(); ?>/assets/img/top_anime_text-03_sp.svg"></object></div>
        </div>

        <!-- Header wrapper -->
        <div class="header__wrapper">
            <div class="logo fadeUp"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/logo.svg" alt="<?php bloginfo('name'); ?>"></div>
            <div class="header__info fadeUp">
                <div class="contact"><a href="<?php echo get_permalink(get_page_by_path('contact')); ?>">お問合せ・資料請求</a></div>
                <div class="tel roboto"><span>Tel.</span><?php echo get_theme_mod('asterhouse_phone', '0120-802-801'); ?></div>
                <div class="header__consul"><a href="<?php echo get_post_type_archive_link('property'); ?>#consul">家づくり相談会</a></div>
            </div>
            <nav class="roboto fadeUp">
                <li><a href="<?php echo get_post_type_archive_link('property'); ?>">Sell</a></li>
                <li><a href="<?php echo get_post_type_archive_link('work'); ?>">Works</a></li>
                <li><a href="#concept">Concept</a></li>
                <li><a href="<?php echo get_post_type_archive_link('news'); ?>">News</a></li>
                <li><a href="<?php echo get_permalink(get_page_by_path('about-us')); ?>">About us</a></li>
            </nav>
        </div>

        <!-- Social media links -->
        <div class="header__top__sns">
            <?php if ($youtube = get_theme_mod('asterhouse_youtube')) : ?>
                <li><a href="<?php echo esc_url($youtube); ?>" target="_blank"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/icon_header_youtube.svg" alt="ユーチューブ"></a></li>
            <?php endif; ?>
            <?php if ($instagram = get_theme_mod('asterhouse_instagram')) : ?>
                <li><a href="<?php echo esc_url($instagram); ?>" target="_blank"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/icon_header_insta.svg" alt="インスタ"></a></li>
            <?php endif; ?>
            <?php if ($tiktok = get_theme_mod('asterhouse_tiktok')) : ?>
                <li><a href="<?php echo esc_url($tiktok); ?>" target="_blank"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/icon_header_tiktok.svg" alt="ティックトック"></a></li>
            <?php endif; ?>
            <?php if ($facebook = get_theme_mod('asterhouse_facebook')) : ?>
                <li><a href="<?php echo esc_url($facebook); ?>" target="_blank"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/icon_header_facebook.svg" alt="フェイスブック"></a></li>
            <?php endif; ?>
        </div>

        <!-- Reserve button -->
        <div class="reserve fadeLeft">
            <a href="<?php echo get_permalink(get_page_by_path('reserve')); ?>"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/header_top_reserve.svg" alt="来場予約"></a>
        </div>

        <!-- Scroll icon -->
        <div class="scroll-icon">
            <div class="line"></div>
            <div class="text roboto">Scroll</div>
        </div>

        <!-- Scroll detection -->
        <span class="top_anime_scroll" id="topAnimeScroll"></span>
    </article>

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