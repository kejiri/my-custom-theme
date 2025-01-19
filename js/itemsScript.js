document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    const genreSelect = document.getElementById('genre-select');
    const searchButton = document.getElementById('search-button');
    const itemsList = document.getElementById('items-list');
    const noResultMessage = document.getElementById('no-result');

    let itemsData = [];

    // JSONファイルからデータを取得
    fetch('<?php echo get_template_directory_uri(); ?>/data/itemsData.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch items data');
            }
            return response.json();
        })
        .then(data => {
            itemsData = data;
            renderItems(itemsData); // 初期表示
        })
        .catch(error => console.error('Error loading items data:', error));

    // 商品リストをレンダリングする関数
    function renderItems(items) {
        itemsList.innerHTML = '';
        if (items.length === 0) {
            noResultMessage.style.display = 'block';
        } else {
            noResultMessage.style.display = 'none';
            items.forEach(item => {
                let genreSection = document.querySelector(`.genre-section[data-genre="${item.genre}"]`);
                if (!genreSection) {
                    const newGenreSection = document.createElement('div');
                    newGenreSection.className = 'genre-section';
                    newGenreSection.setAttribute('data-genre', item.genre);
                    newGenreSection.innerHTML = `
                        <h2 class="genre-title">${item.genre}</h2>
                        <div class="list"></div>
                    `;
                    itemsList.appendChild(newGenreSection);
                }

                const list = document.querySelector(`.genre-section[data-genre="${item.genre}"] .list`);
                const itemElement = document.createElement('div');
                itemElement.className = 'list_content visible';
                itemElement.setAttribute('data-itemid', item.itemID); // itemIDを設定
                itemElement.innerHTML = `
                    <img src="<?php echo get_template_directory_uri(); ?>/${item.image}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>Brand: ${item.brandName}</p> <!-- ブランド名を追加 -->
                    <p>${item.price}</p>
                    <a href="${item.link}" class="item-link" data-id="${item.itemID}">View Details</a>
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
            const matchesGenre = !selectedGenre || item.genre === selectedGenre;
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

    // 検索履歴の取得
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('item-link')) {
            const id = parseInt(e.target.dataset.id, 10);
            const selectedItem = itemsData.find(item => item.itemID === id);

            if (selectedItem) {
                const history = JSON.parse(localStorage.getItem('itemsSearchHistory')) || [];
                
                // 同じIDのアイテムを重複して保存しない
                if (!history.find(item => item.itemID === id)) {
                    history.unshift(selectedItem);
                    localStorage.setItem('itemsSearchHistory', JSON.stringify(history));
                }
            }
        }
    });
});
