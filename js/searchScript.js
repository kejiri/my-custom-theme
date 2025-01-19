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

  // REST APIからデータを取得
  Promise.all([
    fetch('/wp-json/wc/v3/products?per_page=100', {
      headers: { 'Content-Type': 'application/json' }
    }),
    fetch('/wp-json/wp/v2/brands?per_page=100&_embed', {
      headers: { 'Content-Type': 'application/json' }
    })
  ])
    .then(async ([itemsResponse, brandsResponse]) => {
      if (!itemsResponse.ok) throw new Error('Failed to fetch items data');
      if (!brandsResponse.ok) throw new Error('Failed to fetch brands data');

      itemsData = await itemsResponse.json();
      brandsData = (await brandsResponse.json()).map(brand => ({
        id: brand.id,
        name: brand.title.rendered,
        genre: brand.genre || 'Uncategorized',
        image: brand._embedded['wp:featuredmedia']?.[0]?.source_url || 'placeholder.jpg',
        link: brand.link
      }));
    })
    .catch(error => console.error('Error loading data:', error));

  // Itemsの検索処理
  function searchItems() {
    const keyword = itemsSearchInput.value.trim().toLowerCase();
    const category = itemsCategorySelect.value;

    const filteredItems = itemsData.filter(item => {
      const matchesKeyword = !keyword || item.name.toLowerCase().includes(keyword);
      const matchesCategory = !category || item.categories.some(cat => cat.name === category);
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
          <img src="${result.image || result.images[0]?.src}" alt="${result.name}" style="width: 150px; height: auto;">
          <h3>${result.name}</h3>
          <p>Category: ${result.genre || result.categories[0]?.name}</p>
          ${result.price_html ? `<p>Price: ${result.price_html}</p>` : ''}
          <a href="${result.link || result.permalink}" class="${linkClass}" data-id="${result.id}">View Details</a>
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
      const selectedItem = data.find(item => item.id === id);

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
          <img src="${entry.image}" alt="${entry.name}" style="width: 150px; height: auto;">
          <h3>${entry.name}</h3>
          <p>Category: ${entry.genre}</p>
          ${entry.price_html ? `<p>Price: ${entry.price_html}</p>` : ''}
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
});
