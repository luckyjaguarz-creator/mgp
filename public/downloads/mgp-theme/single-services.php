<?php
get_header(); ?>
<main class="single-service">
    <div class="container">
        <h1><?php the_title(); ?></h1>
        <div class="service-meta">
            <span>Нормативная база: <?php echo esc_html(get_field("norm_base")); ?></span>
        </div>
        <div class="service-content">
            <?php the_content(); ?>
        </div>
        <div class="service-calc-form">
            <h3>Заказать расчет по услуге</h3>
            <?php echo do_shortcode("[mgp_consultation_form]"); ?>
        </div>
    </div>
</main>
<?php get_footer(); ?>
