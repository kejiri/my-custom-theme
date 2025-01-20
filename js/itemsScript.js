document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    const genreSelect = document.getElementById('genre-select');
    const searchButton = document.getElementById('search-button');
    const itemsList = document.getElementById('items-list');
    const noResultMessage = document.getElementById('no-result');

    let itemsData = [];

    // Consumer Key と Consumer Secret
    const consumerKey = 'ck_f5a3e4b475573e99cffiff7ec3dbba111e70b288'; // WooCommerceで生成したConsumer Key
    const consumerSecret = 'cs_498ebaadf7d09f6429ccee1793da3dc537954ab1'; // WooCommerceで生成したConsumer Secret

    // WooCommerce REST APIからデータを取得
    const fetchItems = async () => {
        try {
            const response = await fetch('/wp-json/wc/v3/products?per_page=100', {
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
                let genreSection = document.querySelector(`.genre-section[data-genre="${item.categories[0]?.name || 'Uncategorized'}"]`);
                if (!genreSection) {
                    const newGenreSection = document.createElement('div');
                    newGenreSection.className = 'genre-section';
                    newGenreSection.setAttribute('data-genre', item.categories[0]?.name || 'Uncategorized');
                    newGenreSection.innerHTML = `
                        <h2 class="genre-title">${item.categories[0]?.name || 'Uncategorized'}</h2>
                        <div class="list"></div>
                    `;
                    itemsList.appendChild(newGenreSection);
                }

                const list = document.querySelector(`.genre-section[data-genre="${item.categories[0]?.name || 'Uncategorized'}"] .list`);
                const itemElement = document.createElement('div');
                itemElement.className = 'list_content visible';
                itemElement.setAttribute('data-itemid', item.id);
                itemElement.innerHTML = `
                    <img src="${item.images[0]?.src || 'placeholder.jpg'}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>Price: ${item.price_html || 'N/A'}</p>
                    <a href="${item.permalink}" class="item-link" data-id="${item.id}">View Details</a>
                `;
                list.appendChild(itemElement);
            });
        }
    }

    // 検索処理
    function performSearch() {
        const keyword = searchInput.value.trim().toLowerCase();
        const selectedGenre = genreSelect.value.trim();
        const filteredItems = itemsData.filter(item => {
            const matchesKeyword = !keyword || item.name.toLowerCase().includes(keyword);
            const matchesGenre = !selectedGenre || item.categories.some(category => category.name === selectedGenre);
            return matchesKeyword && matchesGenre;
        });
        renderItems(filteredItems);
    }

	// 検索ボタンのクリックイベント
    searchButton.addEventListener('click', performSearch);

    // Enterキーで検索を実行
    searchInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });

    genreSelect.addEventListener('change', performSearch);

    // 検索履歴の保存
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('item-link')) {
            const id = parseInt(e.target.dataset.id, 10);
            const selectedItem = itemsData.find(item => item.id === id);

            if (selectedItem) {
                const history = JSON.parse(localStorage.getItem('shopSearchHistory')) || [];
                
                // 重複を防ぐ
                if (!history.find(item => item.id === id)) {
                    history.unshift(selectedItem);
                    localStorage.setItem('shopSearchHistory', JSON.stringify(history));
                }
            }
        }
    });

    // イベントリスナー
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => e.key === 'Enter' && performSearch());
    genreSelect.addEventListener('change', performSearch);

    // 初期データを取得
    fetchItems();
});
