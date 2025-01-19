<?php
// ヘッダーを呼び出す
get_header();
?>

<main class="rankings">
    <section class="ranking-section">
        <h2>Items Rankings</h2>
        <h3>Overall Rankings</h3>
        <div id="items-overall-ranking" class="horizontal-scroll"></div>
        <h3>By Genres</h3>
        <div id="items-genre1-ranking" class="horizontal-scroll">
            <h4>Genre 1</h4>
        </div>
        <div id="items-genre2-ranking" class="horizontal-scroll">
            <h4>Genre 2</h4>
        </div>

        <h2>Brands Rankings</h2>
        <h3>Overall Rankings</h3>
        <div id="brands-overall-ranking" class="horizontal-scroll"></div>
    </section>
</main>

<?php
// フッターを呼び出す
get_footer();
?>
