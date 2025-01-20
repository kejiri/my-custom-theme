<?php
/**
 * Template Name: News Page
 * Description: A custom template for the news page.
 */
// ヘッダーを呼び出す
get_header();
?>

<main class="news">
    <div class="news_container">
        <!-- Filters Section -->
        <div class="filters">
            <select name="category" id="category-select">
                <option value="">All Categories</option>
                <?php
                // WordPressのカテゴリを取得して表示
                $categories = get_categories(['hide_empty' => true]);
                foreach ($categories as $category) {
                    echo '<option value="' . esc_attr($category->slug) . '">' . esc_html($category->name) . '</option>';
                }
                ?>
            </select>
            <select name="archive" id="date-select">
                <option value="">All Dates</option>
                <?php
                // アーカイブ日付を取得
                global $wpdb;
                $dates = $wpdb->get_results("
                    SELECT DISTINCT YEAR(post_date) AS year, MONTH(post_date) AS month 
                    FROM $wpdb->posts 
                    WHERE post_type = 'post' AND post_status = 'publish'
                    ORDER BY post_date DESC
                ");
                foreach ($dates as $date) {
                    $dateValue = sprintf('%04d-%02d', $date->year, $date->month);
                    $dateLabel = date("F Y", strtotime($date->year . '-' . $date->month . '-01'));
                    echo '<option value="' . esc_attr($dateValue) . '">' . esc_html($dateLabel) . '</option>';
                }
                ?>
            </select>
            <input type="text" id="keyword-input" placeholder="Search news...">
            <button id="search-button">Search</button>
        </div>

        <!-- Highlight Section -->
        <div id="highlight" class="highlight"></div>

        <!-- No Results Message -->
        <p id="no-result" style="display: none;">No news items match your search criteria.</p>

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
