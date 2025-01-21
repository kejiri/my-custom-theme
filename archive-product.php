<?php
// WooCommerceのヘッダーを呼び出す
get_header();
?>

<main class="items">
    <div class="search-bar">
        <input id="search-input" type="text" placeholder="Search for products...">
        <select id="genre-select">
            <option value="">All Genres</option>
            <?php
            // WooCommerceカテゴリ（ジャンル）を取得
            $terms = get_terms([
                'taxonomy' => 'product_cat', // WooCommerceの商品カテゴリ
                'hide_empty' => true, // 商品が存在しないカテゴリを非表示
            ]);

            if (!empty($terms) && !is_wp_error($terms)) {
                foreach ($terms as $term) {
                    echo '<option value="' . esc_attr($term->slug) . '">' . esc_html($term->name) . '</option>';
                }
            }
            ?>
        </select>
        <button id="search-button">Search</button>
    </div>
    <p id="no-result" class="no-result">No items found. Please try a different search.</p>
    <div id="items-list">
        <!-- 商品リストはJavaScriptで動的に表示 -->
    </div>
</main>

<script>
	document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    const genreSelect = document.getElementById('genre-select');
    const searchButton = document.getElementById('search-button');
    const itemsList = document.getElementById('items-list');
    const noResultMessage = document.getElementById('no-result');
    let itemsData = [];
		
    // PHPからConsumer KeyとSecretをJavaScriptに渡す
    const consumerKey = "<?php echo esc_js('ck_f5a3e4b475573e99cffiff7ec3dbba111e70b288'); ?>";
    const consumerSecret = "<?php echo esc_js('cs_498ebaadf7d09f6429ccee1793da3dc537954ab1'); ?>";
	
	// WooCommerce REST APIから商品データを取得
    const fetchItems = async () => {
        try {
            const response = await fetch('http://shibuly-local.local/wp-content/uploads/woocommerce_uploads/?per_page=100', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa(`${consumerKey}:${consumerSecret}`),
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            itemsData = data;
            renderItems(itemsData); // 初期表示
        } catch (error) {
            console.error('Error loading items data:', error);
            noResultMessage.style.display = 'block';
            noResultMessage.textContent = 'Failed to load items. Please try again later.';
        }
    };

    // 商品リストをレンダリングする関数
    function renderItems(items) {
        itemsList.innerHTML = '';
        if (items.length === 0) {
            noResultMessage.style.display = 'block';
        } else {
            noResultMessage.style.display = 'none';
            items.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'item';
                itemElement.innerHTML = `
                    <img src="${item.images[0]?.src || 'placeholder.jpg'}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>Price: ${item.price_html || 'N/A'}</p>
                    <a href="${item.permalink}" class="item-link">View Details</a>
                `;
                itemsList.appendChild(itemElement);
            });
        }
    }

    // 検索処理
    function performSearch() {
        const keyword = searchInput.value.trim().toLowerCase();
        const selectedGenre = genreSelect.value.trim();
        const filteredItems = itemsData.filter(item => {
            const matchesKeyword = !keyword || item.name.toLowerCase().includes(keyword);
            const matchesGenre = !selectedGenre || item.categories.some(category => category.slug === selectedGenre);
            return matchesKeyword && matchesGenre;
        });
        renderItems(filteredItems);
    }

    // イベントリスナー
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => e.key === 'Enter' && performSearch());
    genreSelect.addEventListener('change', performSearch);

    // 初期データを取得
    fetchItems();
});
</script>

<?php
// WooCommerceのフッターを呼び出す
get_footer();
?>
