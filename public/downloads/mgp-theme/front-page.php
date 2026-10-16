<?php
get_header(); ?>
<main class="front-page">
    <section class="hero-section">
        <div class="container">
            <h1>Комплексное градостроительное проектирование и планировка территорий</h1>
            <p>30+ лет опыта разработки генеральных планов, ППТ, ПМТ и ПЗЗ в Нижегородской области и РФ.</p>
            <div class="hero-actions">
                <a href="/uslugi/" class="btn-primary">Каталог услуг</a>
                <a href="/proekty/" class="btn-secondary">Хроника проектов</a>
            </div>
        </div>
    </section>

    <section class="services-overview">
        <div class="container">
            <h2>Ключевые градостроительные услуги</h2>
            <?php
            $services_query = new WP_Query(array("post_type" => "services", "posts_per_page" => 9));
            if ($services_query->have_posts()) :
                while ($services_query->have_posts()) : $services_query->the_post(); ?>
                    <article class="service-card">
                        <h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
                        <p><?php the_excerpt(); ?></p>
                        <a href="<?php the_permalink(); ?>" class="link-more">Подробнее →</a>
                    </article>
                <?php endwhile;
                wp_reset_postdata();
            endif; ?>
        </div>
    </section>
</main>
<?php get_footer(); ?>
