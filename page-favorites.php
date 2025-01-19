<?php
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
            <option value="Genre 1">Genre 1</option>
            <option value="Genre 2">Genre 2</option>
        </select>
        <button id="search-button">Search</button>
    </div>
    <p id="no-result" class="no-result">No items found. Please try a different search.</p>
    <div class="container">
        <div class="favorites-section">
            <div class="type-section" data-type="Items">
                <h2 class="type-title">Items Favorites</h2>
                <div class="genre-section" data-genre="Genre 1">
                    <h2 class="genre-title">Genre 1</h2>
                    <div class="list">
                        <div class="list_content" data-name="Product Name 1">
                            <img src="<?php echo get_template_directory_uri(); ?>/img/product1.jpg" alt="Product 1">
                            <h3>Product Name 1</h3>
                            <p>$100</p>
                            <a href="<?php echo home_url('/items-templete'); ?>">View Details</a>
                        </div>
                        <!-- 他のリストアイテムを続ける -->
                    </div>
                </div>
                <div class="genre-section" data-genre="Genre 2">
                    <h2 class="genre-title">Genre 2</h2>
                    <div class="list">
                        <div class="list_content" data-name="Product Name 4">
                            <img src="<?php echo get_template_directory_uri(); ?>/img/product4.jpg" alt="Product 4">
                            <h3>Product Name 4</h3>
                            <p>$250</p>
                            <a href="<?php echo home_url('/product-detail4'); ?>">View Details</a>
                        </div>
                        <!-- 他のリストアイテムを続ける -->
                    </div>
                </div>
            </div>

            <div class="type-section" data-type="Brands">
                <h2 class="type-title">Brands Favorites</h2>
                <div class="genre-section" data-genre="Genre 1">
                    <h2 class="genre-title">Genre 1</h2>
                    <div class="list">
                        <div class="list_content" data-name="Brand Name 1">
                            <img src="<?php echo get_template_directory_uri(); ?>/img/brand1.jpg" alt="Brand 1">
                            <h3>Brand Name 1</h3>
                            <a href="<?php echo home_url('/brands-templete'); ?>">View Details</a>
                        </div>
                        <!-- 他のブランドリストを続ける -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

<?php
// フッターを呼び出す
get_footer();
?>
