<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, user-scalable=yes">
    <meta name="format-detection" content="telephone=no">
    <?php wp_head(); ?>
</head>

<body <?php body_class('loading'); ?>>
<?php wp_body_open(); ?>

<!-- オーバーレイ -->
<div class="overlay"></div>

<!-- ローディング表示 -->
<div class="loading_wrap on" id="loadingWrap">
    <object class="loading-anime" type="image/svg+xml" data="<?php echo get_template_directory_uri(); ?>/assets/img/loading_anime.svg"></object>
</div>

<!-- ローディング中に表示するトップ境界線アニメーション -->
<div class="loading_top_border_wrap" id="loadingTopBorder">
    <object class="loading_top_border pc" type="image/svg+xml" data="<?php echo get_template_directory_uri(); ?>/assets/img/top_anime_border_pc.svg"></object>
    <object class="loading_top_border sp" type="image/svg+xml" data="<?php echo get_template_directory_uri(); ?>/assets/img/top_anime_border_sp.svg"></object>
</div>

<!--共通ヘッダー-->
<header class="header__page">
    <div class="logo">
        <a href="<?php echo esc_url(home_url('/')); ?>">
            <img src="<?php echo get_template_directory_uri(); ?>/assets/img/icon_symbol.svg" alt="<?php bloginfo('name'); ?>" class="pc">
            <img src="<?php echo get_template_directory_uri(); ?>/assets/img/logo_header_sp.svg" alt="<?php bloginfo('name'); ?>" class="sp">
        </a>
    </div>
    <div class="contact">
        <a href="<?php echo esc_url(home_url('/contact')); ?>">お問合せ</a>
    </div>
    <div class="openbtn1" id="menuButton"><span></span><span></span><span></span></div>
    <nav id="g-nav">
        <div class="panel__logo">
            <a href="<?php echo esc_url(home_url('/')); ?>">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/img/logo_header_sp.svg" alt="<?php bloginfo('name'); ?>" class="sp">
            </a>
        </div>
        <div class="sns">
            <ul>
                <li><a href="https://www.youtube.com/channel/UCoIVR-wyZFAeAOx5vTYoVxw" target="_blank"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/icon_header_youtube.svg" alt="ユーチューブ"></a></li>
                <li><a href="https://www.instagram.com/__aster_house" target="_blank"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/icon_header_insta.svg" alt="インスタ"></a></li>
                <li><a href="https://www.facebook.com/people/%E3%82%A2%E3%82%B9%E3%82%BF%E3%83%BC%E3%83%8F%E3%82%A6%E3%82%B9/100083320001835/" target="_blank"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/icon_header_facebook.svg" alt="フェイスブック"></a></li>
                <li><a href="#" target="_blank"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/icon_header_tiktok.svg" alt="ティックトック"></a></li>    
            </ul>
        </div>
        <div id="g-navi-list">
            <?php
            wp_nav_menu(array(
                'theme_location' => 'primary',
                'menu_class' => '',
                'container' => false,
                'items_wrap' => '<ul>%3$s</ul>',
                'walker' => new Aster_House_Menu_Walker()
            ));
            ?>
        </div>
    </nav>
    <div class="panel" id="menuPanel"></div>
</header>

<?php if (is_front_page()) : ?>
<article class="header__top border_none" id="headerTop">
    <div class="top_anime-bg_wrap" id="topAnimeBgWrap">
        <div class="top_anime-text-01 pc"><object type="image/svg+xml" data="<?php echo get_template_directory_uri(); ?>/assets/img/top_anime_text-01_pc.svg"></object></div>
        <div class="top_anime-text-02 pc"><object type="image/svg+xml" data="<?php echo get_template_directory_uri(); ?>/assets/img/top_anime_text-02_pc.svg"></object></div>
        <div class="top_anime-text-03 pc"><object type="image/svg+xml" data="<?php echo get_template_directory_uri(); ?>/assets/img/top_anime_text-03_pc.svg"></object></div>
        <div class="top_anime-text-02 sp"><object type="image/svg+xml" data="<?php echo get_template_directory_uri(); ?>/assets/img/top_anime_text-02_sp.svg"></object></div>
        <div class="top_anime-text-01 sp"><object type="image/svg+xml" data="<?php echo get_template_directory_uri(); ?>/assets/img/top_anime_text-01_sp.svg"></object></div>
        <div class="top_anime-text-03 sp"><object type="image/svg+xml" data="<?php echo get_template_directory_uri(); ?>/assets/img/top_anime_text-03_sp.svg"></object></div>
    </div>
    <div class="loading_top_border_wrap" id="loadingTopBorder">
        <object class="loading_top_border pc" type="image/svg+xml" data="<?php echo get_template_directory_uri(); ?>/assets/img/top_anime_border_pc.svg"></object>
        <object class="loading_top_border sp" type="image/svg+xml" data="<?php echo get_template_directory_uri(); ?>/assets/img/top_anime_border_sp.svg"></object>
    </div>
    <div class="header__wrapper">
        <div class="logo fadeUp"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/logo.svg" alt="<?php bloginfo('name'); ?>"></div>
        <div class="header__info fadeUp">
            <div class="contact"><a href="<?php echo esc_url(home_url('/contact')); ?>">お問合せ・資料請求</a></div>
            <div class="tel roboto"><span>Tel.</span>0120-802-801</div>
            <div class="header__consul"><a href="<?php echo esc_url(home_url('/sell#consul')); ?>">家づくり相談会</a></div>
        </div>
        <nav class="roboto fadeUp">
            <?php
            wp_nav_menu(array(
                'theme_location' => 'primary',
                'menu_class' => '',
                'container' => false,
                'items_wrap' => '<ul>%3$s</ul>',
                'walker' => new Aster_House_Menu_Walker()
            ));
            ?>
        </nav>
    </div>
    <div class="header__top__sns">
        <li><a href="https://www.youtube.com/channel/UCoIVR-wyZFAeAOx5vTYoVxw" target="_blank"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/icon_header_youtube.svg" alt="ユーチューブ"></a></li>
        <li><a href="https://www.instagram.com/__aster_house" target="_blank"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/icon_header_insta.svg" alt="インスタ"></a></li>
        <li><a href="#" target="_blank"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/icon_header_tiktok.svg" alt="ティックトック"></a></li>
        <li><a href="https://www.facebook.com/people/%E3%82%A2%E3%82%B9%E3%82%BF%E3%83%BC%E3%83%8F%E3%82%A6%E3%82%B9/100083320001835/" target="_blank"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/icon_header_facebook.svg" alt="フェイスブック"></a></li>
    </div>
    <div class="reserve fadeLeft">
        <a href="<?php echo esc_url(home_url('/reserve')); ?>"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/header_top_reserve.svg" alt="来場予約"></a>
    </div>
    <div class="scroll-icon">
        <div class="line"></div>
        <div class="text roboto">Scroll</div>
    </div>
    <span class="top_anime_scroll" id="topAnimeScroll"></span>
</article>
<?php endif; ?> 