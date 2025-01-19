<?php
// ヘッダーを呼び出す
get_header();
?>

<main class="news">
    <div class="news_container">
        <!-- Filters Section -->
        <div class="filters">
            <select name="category" id="category-select">
                <option value="">All Categories</option>
                <option value="events">Events</option>
                <option value="updates">Updates</option>
                <option value="promotions">Promotions</option>
            </select>
            <select name="archive" id="date-select">
                <option value="">All Dates</option>
                <option value="2024-12">December 2024</option>
                <option value="2024-11">November 2024</option>
                <option value="2024-10">October 2024</option>
                <option value="2024-09">September 2024</option>
            </select>
            <input type="text" id="keyword-input" placeholder="Search news...">
            <button id="search-button">Search</button>
        </div>

        <!-- Highlight Section -->
        <div id="highlight" class="highlight"></div>

        <!-- No Results Message -->
        <p id="no-result">No news items match your search criteria.</p>

        <!-- News Items -->
        <div id="news-list"></div>

        <!-- Pagination -->
        <div class="pagination" id="pagination"></div>
    </div>
</main>

<?php
// フッターを呼び出す
get_footer();
?>
