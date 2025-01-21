<?php
/**
 * Template Name: Brands
 * Description: A custom template for the brands page.
 */

// ヘッダーを呼び出す
get_header();
?>

<main class="brands">
    <div class="search-bar">
        <input id="search-input" type="text" placeholder="Search for brands...">

        <select id="genre-select">
            <option value="">All Genres</option>
            <?php
            // WooCommerceのブランドタクソノミーを取得
            $terms = get_terms([
                'taxonomy' => 'product_brand', // WooCommerceのブランドタクソノミー
                'hide_empty' => true, // 商品がないブランドを非表示
            ]);

            if (!empty($terms) && !is_wp_error($terms)) {
                foreach ($terms as $term) {
                    echo '<option value="' . esc_attr($term->slug) . '">' . esc_html($term->name) . '</option>';
                }
            } else {
                echo '<option value="">No genres available</option>';
            }
            ?>
        </select>

        <button id="search-button">Search</button>
    </div>

    <p id="no-result" class="no-result" style="display: none;">No brands found. Please try a different search.</p>

    <div id="brands-list">
        <!-- JavaScriptがブランドリストを動的にレンダリング -->
    </div>
</main>

<?php
// フッターを呼び出す
get_footer();
?>
