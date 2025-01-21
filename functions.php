<?php
// テーマの基本設定
function theme_setup() {
    add_theme_support('post-thumbnails'); // アイキャッチ画像を有効化
    add_theme_support('title-tag'); // ページタイトルの自動設定
    add_theme_support('html5', ['search-form', 'comment-form', 'comment-list', 'gallery', 'caption']); // HTML5対応
    add_theme_support('woocommerce'); // WooCommerceサポートを有効化
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
}
add_action('wp_enqueue_scripts', 'enqueue_theme_assets');

// ページ別スクリプトの読み込み
function enqueue_page_specific_scripts() {
    $page_scripts = [
        'items' => 'itemsScript.js',
        'brands' => 'brandsScript.js',
        'news' => 'newsScript.js',
        'favorites' => 'favoritesScript.js',
        'ranking' => 'rankingScript.js',
        'search' => 'searchScript.js',
    ];

    // 現在のページスラッグを取得
    global $post;
    if (isset($post) && !empty($post->post_name)) {
        $page_slug = $post->post_name;
        if (array_key_exists($page_slug, $page_scripts)) {
            wp_enqueue_script(
                "{$page_slug}-script", // スクリプトのハンドル名
                get_template_directory_uri() . "/js/{$page_scripts[$page_slug]}", // スクリプトのパス
                [],
                null,
                true // フッターでスクリプトを読み込む
            );
        }
    }
}
add_action('wp_enqueue_scripts', 'enqueue_page_specific_scripts');

// WooCommerce REST APIに接続するための認証ヘッダー追加
function add_woocommerce_rest_auth_header($request) {
    $request['headers']['Authorization'] = 'Basic ' . base64_encode('ck_f5a3e4b475573e99cffiff7ec3dbba111e70b288:cs_498ebaadf7d09f6429ccee1793da3dc537954ab1');
    return $request;
}
add_filter('http_request_args', 'add_woocommerce_rest_auth_header', 10, 1);

// WooCommerceのカスタムエンドポイント（必要に応じて実装）
function add_custom_woocommerce_endpoints() {
    // 必要に応じてカスタムエンドポイントを追加
}
add_action('init', 'add_custom_woocommerce_endpoints');

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

// WooCommerceサポートを有効化
function add_woocommerce_support() {
    add_theme_support('woocommerce');
}
add_action('after_setup_theme', 'add_woocommerce_support');
