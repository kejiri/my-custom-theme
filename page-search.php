<?php
// ヘッダーを呼び出す
get_header();
?>

<main class="search">
  <div class="search_container">
    <!-- Items Search Section -->
    <div class="search-section">
      <div class="search-field">
        <label for="items-search">Search Items</label>
        <input type="text" id="items-search" placeholder="Search for Items...">
        <div class="filters">
          <select name="category" id="items-category">
            <option value="">All Genres</option>
            <?php
            // WooCommerceのカテゴリを取得してセレクトボックスを生成
            $genres = get_terms([
                'taxonomy' => 'product_cat', // WooCommerceの商品カテゴリ
                'hide_empty' => true,
            ]);
            foreach ($genres as $genre) {
                echo '<option value="' . esc_attr($genre->slug) . '">' . esc_html($genre->name) . '</option>';
            }
            ?>
          </select>
          <button id="items-search-button">Search</button>
        </div>
        <div id="items-results" class="results"></div>
      </div>

      <!-- Items Search History Section -->
      <div class="history-section">
        <h2>Items Search History</h2>
        <button id="clear-items-history" class="clear-btn" style="display: none;">Clear All</button>
        <div id="items-history" class="history-list"></div>
      </div>
    </div>

    <!-- Brands Search Section -->
    <div class="search-field">
      <label for="brands-search">Search Brands</label>
      <input type="text" id="brands-search" placeholder="Search for Brands...">
      <div class="filters">
        <select name="category" id="brands-category">
          <option value="">All Genres</option>
          <?php
          // ブランド用カスタムタクソノミーを取得
          $brand_genres = get_terms([
              'taxonomy' => 'brand_genre', // ブランド用のカスタムタクソノミー
              'hide_empty' => true,
          ]);
          foreach ($brand_genres as $genre) {
              echo '<option value="' . esc_attr($genre->slug) . '">' . esc_html($genre->name) . '</option>';
          }
          ?>
        </select>
        <button id="brands-search-button">Search</button>
      </div>
      <div id="brands-results" class="results"></div>
    </div>

    <!-- Brands Search History Section -->
    <div class="history-section">
      <h2>Brands Search History</h2>
      <button id="clear-brands-history" class="clear-btn" style="display: none;">Clear All</button>
      <div id="brands-history" class="history-list"></div>
    </div>
  </div>
</main>

<?php
// フッターを呼び出す
get_footer();
?>
