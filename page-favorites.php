<?php
/**
 * Template Name: Favorites Page
 * Description: A custom template for the favorites page.
 */
// ヘッダーを呼び出す
get_header();
?>

<main class="favorites">
    <div class="search-bar">
        <input id="search-input" type="text" placeholder="Search for products...">
        <select id="type-select">
            <option value="">All Items and Brands</option>
            <option value="Items">Items</option>
            <option value="Brands">Brands</option>
        </select>
        <select id="genre-select">
            <option value="">All Genres</option>
            <?php
            // カスタムタクソノミーからジャンルを取得
            $genres = get_terms([
                'taxonomy' => 'genre', // カスタムタクソノミー名
                'hide_empty' => true,
            ]);
            foreach ($genres as $genre) {
                echo '<option value="' . esc_attr($genre->slug) . '">' . esc_html($genre->name) . '</option>';
            }
            ?>
        </select>
        <button id="search-button">Search</button>
    </div>
    <p id="no-result" class="no-result">No items found. Please try a different search.</p>
    <div class="container">
        <div id="favorites-list">
            <!-- JavaScriptでお気に入りリストを動的にレンダリング -->
        </div>
    </div>
</main>

<?php
// フッターを呼び出す
get_footer();
?>
