<?php
// WooCommerceのヘッダーを呼び出す
get_header();
?>

<main class="items">
    <div class="search-bar">
        <input id="search-input" type="text" placeholder="Search for products...">
        <select id="genre-select">
            <option value="">All Genres</option>
            <?php
            // WooCommerceカテゴリ（ジャンル）を取得
            $terms = get_terms([
                'taxonomy' => 'product_cat', // WooCommerceの商品カテゴリ
                'hide_empty' => true, // 商品が存在しないカテゴリを非表示
            ]);

            if (!empty($terms) && !is_wp_error($terms)) {
                foreach ($terms as $term) {
                    echo '<option value="' . esc_attr($term->slug) . '">' . esc_html($term->name) . '</option>';
                }
            }
            ?>
        </select>
        <button id="search-button">Search</button>
    </div>
    <p id="no-result" class="no-result">No items found. Please try a different search.</p>
    <div id="items-list">
        <!-- 商品リストはJavaScriptで動的に表示 -->
    </div>
</main>

<?php
// WooCommerceのフッターを呼び出す
get_footer();
?>
