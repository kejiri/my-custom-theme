<?php
// ヘッダーを呼び出す
get_header();
?>

<main class="items">
    <div class="search-bar">
        <input id="search-input" type="text" placeholder="Search for products...">
        <select id="genre-select">
            <option value="">All Genres</option>
            <option value="Genre 1">Genre 1</option>
            <option value="Genre 2">Genre 2</option>
        </select>
        <button id="search-button">Search</button>
    </div>
    <p id="no-result" class="no-result">No items found. Please try a different search.</p>
    <div id="items-list">
        <!-- JavaScriptが動的にアイテムをレンダリング -->
    </div>
</main>

<?php
// フッターを呼び出す
get_footer();
?>
