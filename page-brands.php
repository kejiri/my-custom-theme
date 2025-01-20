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
            // カスタムタクソノミーのジャンルを取得
            $genres = get_terms([
                'taxonomy' => 'brand_genre', // カスタムタクソノミー名
                'hide_empty' => true,
            ]);
            foreach ($genres as $genre) {
                echo '<option value="' . esc_attr($genre->slug) . '">' . esc_html($genre->name) . '</option>';
            }
            ?>
        </select>
        <button id="search-button">Search</button>
    </div>
    <p id="no-result" class="no-result">No brands found. Please try a different search.</p>
    <div id="brands-list">
        <!-- JavaScriptがブランドリストを動的にレンダリング -->
    </div>
</main>

<?php
// フッターを呼び出す
get_footer();
?>
