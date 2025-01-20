<?php
// テーマの基本設定
function theme_setup() {
    add_theme_support('post-thumbnails'); // アイキャッチ画像を有効化
    add_theme_support('title-tag'); // ページタイトルの自動設定
    add_theme_support('html5', ['search-form', 'comment-form', 'comment-list', 'gallery', 'caption']); // HTML5対応
}
add_action('after_setup_theme', 'theme_setup');

// スタイルとスクリプトの読み込み
function enqueue_theme_assets() {
    // スタイルシートの読み込み
    wp_enqueue_style(
        'style',
        get_template_directory_uri() . '/style.css',
        [],
        null
    );

    // JavaScriptファイルの読み込み
    function enqueue_items_script() {
    // WooCommerceの "items" ページでのみスクリプトを読み込む
    if (is_page('items')) {
        wp_enqueue_script(
            'items-script', // スクリプトのハンドル名
            get_template_directory_uri() . '/js/itemsScript.js', // スクリプトのパス
            array(), // 依存スクリプト
            null, // バージョン番号（キャッシュバイパスする場合はnull）
            true // フッターでスクリプトを読み込む
        );
    }
}
add_action('wp_enqueue_scripts', 'enqueue_items_script');


    if (is_page('news')) {
        wp_enqueue_script(
            'news-script',
            get_template_directory_uri() . '/js/newsScript.js',
            [],
            null,
            true
        );
    }

    if (is_page('favorites')) {
        wp_enqueue_script(
            'favorites-script',
            get_template_directory_uri() . '/js/favoritesScript.js',
            [],
            null,
            true
        );
    }

    if (is_page('rankings')) {
        wp_enqueue_script(
            'rankings-script',
            get_template_directory_uri() . '/js/rankingScript.js',
            [],
            null,
            true
        );
    }

    if (is_page('search')) {
        wp_enqueue_script(
            'search-script',
            get_template_directory_uri() . '/js/searchScript.js',
            [],
            null,
            true
        );
    }
}
add_action('wp_enqueue_scripts', 'enqueue_theme_assets');

// WooCommerce REST APIに接続するための認証
function add_woocommerce_rest_auth_header($request) {
    $request['consumer_key'] = 'ck_your_consumer_key'; // WooCommerceのコンシューマキー
    $request['consumer_secret'] = 'cs_your_consumer_secret'; // WooCommerceのコンシューマシークレット
    return $request;
}
add_filter('woocommerce_rest_authentication_headers', 'add_woocommerce_rest_auth_header');

// カスタム投稿タイプの登録（Brands）
function create_brand_post_type() {
    register_post_type('brands', [
        'labels' => [
            'name' => 'Brands',
            'singular_name' => 'Brand',
        ],
        'public' => true,
        'has_archive' => true,
        'supports' => ['title', 'editor', 'thumbnail', 'custom-fields'],
        'rewrite' => ['slug' => 'brands'],
    ]);
}
add_action('init', 'create_brand_post_type');

// ブランド用カスタムタクソノミーの登録
function create_brand_genre_taxonomy() {
    register_taxonomy('brand_genre', 'brands', [
        'labels' => [
            'name' => 'Genres',
            'singular_name' => 'Genre',
        ],
        'public' => true,
        'hierarchical' => true,
    ]);
}
add_action('init', 'create_brand_genre_taxonomy');

// WooCommerceのカスタムエンドポイントの追加
function add_custom_woocommerce_endpoints() {
    // 必要に応じてカスタムエンドポイントを追加
}
add_action('init', 'add_custom_woocommerce_endpoints');

// 管理画面のブランド用カスタム列
function add_brand_columns($columns) {
    $columns['genre'] = 'Genre';
    return $columns;
}
add_filter('manage_brands_posts_columns', 'add_brand_columns');

function manage_brand_columns($column, $post_id) {
    if ($column === 'genre') {
        $terms = get_the_terms($post_id, 'brand_genre');
        if (!empty($terms)) {
            echo esc_html($terms[0]->name);
        } else {
            echo 'No Genre';
        }
    }
}
add_action('manage_brands_posts_custom_column', 'manage_brand_columns', 10, 2);

// WooCommerceサポートを有効化
function add_woocommerce_support() {
    add_theme_support('woocommerce');
}
add_action('after_setup_theme', 'add_woocommerce_support');

// カスタムREST APIエンドポイントの追加例（オプション）
function custom_rest_endpoint() {
    register_rest_route('custom/v1', '/example', [
        'methods' => 'GET',
        'callback' => function() {
            return ['message' => 'Custom REST endpoint is working!'];
        },
    ]);
}
add_action('rest_api_init', 'custom_rest_endpoint');
