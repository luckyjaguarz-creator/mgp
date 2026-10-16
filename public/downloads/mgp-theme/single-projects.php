<?php
get_header(); ?>
<main class="single-project">
    <div class="container">
        <h1><?php the_title(); ?></h1>
        <div class="project-location">
            <span>Локация: <?php echo esc_html(get_field("location")); ?></span>
            <span>Статус: <?php echo esc_html(get_field("status")); ?></span>
        </div>
        <div class="project-body">
            <?php the_content(); ?>
        </div>
    </div>
</main>
<?php get_footer(); ?>
