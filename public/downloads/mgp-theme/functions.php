<?php
/**
 * MGP Theme Functions & Definitions
 * ООО «Мастерская генеральных планов» (mgp.ooo)
 */

if (!defined("ABSPATH")) exit;

function mgp_theme_setup() {
    add_theme_support("title-tag");
    add_theme_support("post-thumbnails");
    add_theme_support("html5", array("search-form", "comment-form", "gallery", "caption"));
    register_nav_menus(array(
        "primary" => __("Главное меню", "mgp-theme"),
        "footer"  => __("Меню в подвале", "mgp-theme"),
    ));
}
add_action("after_setup_theme", "mgp_theme_setup");

// Отключение wp-block-library стилей ядра для максимальной скорости (по ТЗ)
function mgp_remove_block_styles() {
    wp_dequeue_style("wp-block-library");
    wp_dequeue_style("wp-block-library-theme");
    wp_dequeue_style("wc-blocks-style");
}
add_action("wp_enqueue_scripts", "mgp_remove_block_styles", 100);

// Подключение скриптов и стилей
function mgp_enqueue_assets() {
    wp_enqueue_style("mgp-style", get_stylesheet_uri(), array(), "1.0.0");
    wp_enqueue_script("mgp-yandex-maps", "https://api-maps.yandex.ru/2.1/?lang=ru_RU", array(), null, true);
    wp_enqueue_script("mgp-main", get_template_directory_uri() . "/js/main.js", array("jquery"), "1.0.0", true);
    wp_localize_script("mgp-main", "mgp_ajax", array(
        "url" => admin_url("admin-ajax.php"),
        "nonce" => wp_create_nonce("mgp_inquiry_nonce")
    ));
}
add_action("wp_enqueue_scripts", "mgp_enqueue_assets");

// Регистрация Custom Post Types (по ТЗ)
function mgp_register_cpt() {
    // 1. Услуги (services)
    register_post_type("services", array(
        "labels" => array(
            "name" => "Услуги",
            "singular_name" => "Услуга",
            "add_new_item" => "Добавить услугу",
            "edit_item" => "Редактировать услугу",
        ),
        "public" => true,
        "has_archive" => true,
        "rewrite" => array("slug" => "uslugi"),
        "supports" => array("title", "editor", "thumbnail", "excerpt"),
        "menu_icon" => "dashicons-admin-multisite",
    ));

    // 2. Проекты и новости (projects)
    register_post_type("projects", array(
        "labels" => array(
            "name" => "Проекты",
            "singular_name" => "Проект",
            "add_new_item" => "Добавить проект",
        ),
        "public" => true,
        "has_archive" => true,
        "rewrite" => array("slug" => "proekty"),
        "supports" => array("title", "editor", "thumbnail", "excerpt"),
        "menu_icon" => "dashicons-portfolio",
    ));

    // 3. Партнеры (partners)
    register_post_type("partners", array(
        "labels" => array(
            "name" => "Партнеры",
            "singular_name" => "Партнер",
        ),
        "public" => true,
        "has_archive" => false,
        "supports" => array("title", "thumbnail"),
        "menu_icon" => "dashicons-groups",
    ));

    register_taxonomy("partner_category", "partners", array(
        "labels" => array("name" => "Категории партнеров"),
        "hierarchical" => true,
        "public" => true,
    ));

    // 4. Полезные ресурсы (useful_links)
    register_post_type("useful_links", array(
        "labels" => array(
            "name" => "Полезные ресурсы",
            "singular_name" => "Ресурс",
        ),
        "public" => true,
        "has_archive" => true,
        "rewrite" => array("slug" => "poleznye-resursy"),
        "supports" => array("title", "editor"),
        "menu_icon" => "dashicons-admin-links",
    ));

    register_taxonomy("link_category", "useful_links", array(
        "labels" => array("name" => "Категории ресурсов"),
        "hierarchical" => true,
        "public" => true,
    ));
}
add_action("init", "mgp_register_cpt");

// AJAX обработчик отправки формы расчета (152-ФЗ)
add_action("wp_ajax_mgp_submit_inquiry", "mgp_handle_inquiry");
add_action("wp_ajax_nopriv_mgp_submit_inquiry", "mgp_handle_inquiry");

function mgp_handle_inquiry() {
    check_ajax_referer("mgp_inquiry_nonce", "security");
    $name = sanitize_text_field($_POST["name"]);
    $phone = sanitize_text_field($_POST["phone"]);
    $service = sanitize_text_field($_POST["service"]);
    $cadastral = sanitize_text_field($_POST["cadastral"]);
    $message = sanitize_textarea_field($_POST["message"]);

    $to = get_option("admin_email");
    $subject = "Новая заявка с сайта МГП: " . $name;
    $body = "Имя: $name\nТелефон: $phone\nУслуга: $service\nКадастровый номер: $cadastral\nСообщение: $message";

    wp_mail($to, $subject, $body);
    wp_send_json_success(array("message" => "Заявка успешно принята"));
}
