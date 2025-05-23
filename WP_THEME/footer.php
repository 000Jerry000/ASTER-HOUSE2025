<?php
/**
 * The template for displaying the footer
 */
?>
    <footer id="colophon" class="site-footer">
        <div class="footer-inner">
            <div class="footer-widgets">
                <?php if (is_active_sidebar('footer-1')) : ?>
                    <div class="footer-widget-area">
                        <?php dynamic_sidebar('footer-1'); ?>
                    </div>
                <?php endif; ?>
            </div>
            
            <div class="site-info">
                <div class="copyright">
                    <?php
                    printf(
                        esc_html__('© %1$s %2$s. All rights reserved.', 'asterhouse'),
                        date('Y'),
                        get_bloginfo('name')
                    );
                    ?>
                </div>
            </div>
        </div>
    </footer>
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html> 