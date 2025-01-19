document.addEventListener('DOMContentLoaded', () => {
    const itemsSearchInput = document.getElementById('items-search');
    const itemsCategorySelect = document.getElementById('items-category');
    const itemsSearchButton = document.getElementById('items-search-button');
    const itemsResultsContainer = document.getElementById('items-results');

    const brandsSearchInput = document.getElementById('brands-search');
    const brandsCategorySelect = document.getElementById('brands-category');
    const brandsSearchButton = document.getElementById('brands-search-button');
    const brandsResultsContainer = document.getElementById('brands-results');

    const noResultsMessage = '<p>No results found.</p>';

    let itemsData = [];
    let brandsData = [];

    // JSONファイルからデータを取得
    fetch('<?php echo get_template_directory_uri(); ?>/data/itemsData.json')
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch items data');
            return response.json();
        })
        .then(data => {
            itemsData = data;
        })
        .catch(error => console.error('Error loading items data:', error));

    fetch('<?php echo get_template_directory_uri(); ?>/data/brandsData.json')
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch brands data');
            return response.json();
        })
        .then(data => {
            brandsData = data;
        })
        .catch(error => console.error('Error loading brands data:', error));

    // Itemsの検索処理
    function searchItems() {
        const keyword = itemsSearchInput.value.trim().toLowerCase();
        const category = itemsCategorySelect.value;

        const filteredItems = itemsData.filter(item => {
            const matchesKeyword = !keyword || item.name.toLowerCase().includes(keyword);
            const matchesCategory = !category || item.genre === category;
            return matchesKeyword && matchesCategory;
        });

        renderResults(filteredItems, itemsResultsContainer, 'item-link');
    }

    // Brandsの検索処理
    function searchBrands() {
        const keyword = brandsSearchInput.value.trim().toLowerCase();
        const category = brandsCategorySelect.value;

        const filteredBrands = brandsData.filter(brand => {
            const matchesKeyword = !keyword || brand.name.toLowerCase().includes(keyword);
            const matchesCategory = !category || brand.genre === category;
            return matchesKeyword && matchesCategory;
        });

        renderResults(filteredBrands, brandsResultsContainer, 'brand-link');
    }

    // 結果のレンダリング (横向き表示)
    function renderResults(results, container, linkClass) {
        if (results.length === 0) {
            container.innerHTML = noResultsMessage;
        } else {
            container.innerHTML = `<div class="horizontal-scroll">` + results.map(result => `
                <div class="result-item">
                    <img src="<?php echo get_template_directory_uri(); ?>/${result.image}" alt="${result.name}" style="width: 150px; height: auto;">
                    <h3>${result.name}</h3>
                    <p>Category: ${result.genre}</p>
                    ${result.price ? `<p>Price: ${result.price}</p>` : ''}
                    <a href="${result.link}" class="${linkClass}" data-id="${result.brandID || result.itemID}">View Details</a>
                </div>
            `).join('') + '</div>';
        }
    }

    // イベントリスナーの設定
    itemsSearchButton.addEventListener('click', searchItems);
    itemsSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchItems();
    });
    itemsCategorySelect.addEventListener('change', searchItems);

    brandsSearchButton.addEventListener('click', searchBrands);
    brandsSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchBrands();
    });
    brandsCategorySelect.addEventListener('change', searchBrands);

    // View Detailsリンククリック時の履歴保存処理
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('item-link') || e.target.classList.contains('brand-link')) {
            const type = e.target.classList.contains('item-link') ? 'items' : 'brands';
            const id = parseInt(e.target.dataset.id, 10);
            const data = type === 'items' ? itemsData : brandsData;
            const selectedItem = data.find(item => item.itemID === id || item.brandID === id);

            if (selectedItem) {
                const history = JSON.parse(localStorage.getItem(`${type}SearchHistory`)) || [];
                history.unshift(selectedItem);
                localStorage.setItem(`${type}SearchHistory`, JSON.stringify(history));
                renderHistory(type);
            }
        }
    });

    // 履歴の表示関数 (横向き表示)
    function renderHistory(type) {
        const history = JSON.parse(localStorage.getItem(`${type}SearchHistory`)) || [];
        const historyContainer = document.getElementById(`${type}-history`);

        if (history.length > 0) {
            historyContainer.innerHTML = `<div class="horizontal-scroll">` + history.map(entry => `
                <div class="result-item">
                    <img src="<?php echo get_template_directory_uri(); ?>/${entry.image}" alt="${entry.name}" style="width: 150px; height: auto;">
                    <h3>${entry.name}</h3>
                    <p>Category: ${entry.genre}</p>
                    ${entry.price ? `<p>Price: ${entry.price}</p>` : ''}
                </div>
            `).join('') + '</div>';
        } else {
            historyContainer.innerHTML = '<p>No history available.</p>';
        }
    }

    // 初期履歴の非表示設定
    function initializeHistory(type) {
        const history = JSON.parse(localStorage.getItem(`${type}SearchHistory`)) || [];
        if (history.length === 0) {
            document.getElementById(`${type}-history`).style.display = 'none';
        } else {
            renderHistory(type);
        }
    }

    // ページ読み込み時に履歴を初期化
    initializeHistory('items');
    initializeHistory('brands');

    // 他ページでのクリック履歴を反映
    window.addEventListener('storage', (event) => {
        if (event.key === 'itemsSearchHistory' || event.key === 'brandsSearchHistory') {
            renderHistory(event.key.replace('SearchHistory', ''));
        }
    });
});
