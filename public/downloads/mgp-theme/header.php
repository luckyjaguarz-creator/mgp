<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo("charset"); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="<?php echo get_template_directory_uri(); ?>/images/cropped-vs2-32x32.png" sizes="32x32">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<header class="site-header">
    <div class="topbar">
        <div class="container">
            <span>г. Нижний Новгород, ул. Ванеева, д. 34, офис 406</span>
            <div class="top-phones">
                <a href="tel:+79023082433">+7 902 308 24 33</a>
                <a href="tel:+79503513498">+7 950 351 34 98</a>
                <a href="tel:+79503513487">+7 950 351 34 87</a>
            </div>
        </div>
    </div>
    <div class="main-header">
        <div class="container">
            <a href="<?php echo esc_url(home_url("/")); ?>" class="logo">
                <strong>ООО «МГП»</strong>
                <span>Мастерская генеральных планов</span>
            </a>
            <nav class="nav-menu">
                <?php wp_nav_menu(array("theme_location" => "primary", "container" => false)); ?>
            </nav>
            <button class="btn-cta" onclick="openConsultModal()">Оставить заявку</button>
        </div>
    </div>
</header>
