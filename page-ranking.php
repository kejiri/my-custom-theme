<?php
/**
 * Template Name: Ranking Page
 * Description: A custom template for the ranking page.
 */
// ヘッダーを呼び出す
get_header();
?>

<main class="rankings">
    <section class="ranking-section">
        <h2>Items Rankings</h2>
        <h3>Overall Rankings</h3>
        <div id="items-overall-ranking" class="horizontal-scroll"></div>
        
        <h3>By Genres</h3>
        <?php
        // WooCommerceのカテゴリを取得してジャンル別ランキングを動的に表示
        $genres = get_terms([
            'taxonomy' => 'product_cat', // WooCommerceの商品カテゴリ
            'hide_empty' => true,
        ]);

        foreach ($genres as $genre) {
            echo '<div id="items-' . esc_attr($genre->slug) . '-ranking" class="horizontal-scroll">';
            echo '<h4>' . esc_html($genre->name) . '</h4>';
            echo '</div>';
        }
        ?>

        <h2>Brands Rankings</h2>
        <h3>Overall Rankings</h3>
        <div id="brands-overall-ranking" class="horizontal-scroll"></div>
    </section>
</main>

<?php
// フッターを呼び出す
get_footer();
?>
