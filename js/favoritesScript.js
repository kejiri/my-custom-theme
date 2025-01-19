document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('search-input');
  const typeSelect = document.getElementById('type-select');
  const genreSelect = document.getElementById('genre-select');
  const searchButton = document.getElementById('search-button');
  const typeSections = document.querySelectorAll('.type-section');
  const noResultMessage = document.getElementById('no-result');

  let itemsData = [];
  let brandsData = [];

  // WooCommerceとWordPress REST APIからデータを取得
  Promise.all([
    fetch('/wp-json/wc/v3/products?per_page=100', { headers: { 'Content-Type': 'application/json' } }),
    fetch('/wp-json/wp/v2/brands?per_page=100&_embed')
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

      renderFavorites();
    })
    .catch(error => {
      console.error('Error loading data:', error);
      noResultMessage.style.display = 'block';
      noResultMessage.textContent = 'Failed to load data. Please try again later.';
    });

  // 初期表示：すべてのアイテムとブランドを表示
  function renderFavorites() {
    renderItems(itemsData);
    renderBrands(brandsData);
    performSearch(); // 初期検索状態に合わせてフィルタリング
  }

  // アイテムをレンダリングする関数
  function renderItems(items) {
    const itemsSection = document.querySelector('.type-section[data-type="Items"] .list');
    itemsSection.innerHTML = items
      .map(item => `
        <div class="list_content visible" data-name="${item.name}" data-genre="${item.categories[0]?.name || 'Uncategorized'}">
          <img src="${item.images[0]?.src || 'placeholder.jpg'}" alt="${item.name}">
          <h3>${item.name}</h3>
          <p>Price: ${item.price_html || 'N/A'}</p>
          <a href="${item.permalink}" class="item-link">View Details</a>
        </div>
      `)
      .join('');
  }

  // ブランドをレンダリングする関数
  function renderBrands(brands) {
    const brandsSection = document.querySelector('.type-section[data-type="Brands"] .list');
    brandsSection.innerHTML = brands
      .map(brand => `
        <div class="list_content visible" data-name="${brand.name}" data-genre="${brand.genre}">
          <img src="${brand.image}" alt="${brand.name}">
          <h3>${brand.name}</h3>
          <a href="${brand.link}" class="brand-link">View Details</a>
        </div>
      `)
      .join('');
  }

  // 検索処理
  function performSearch() {
    const keyword = searchInput.value.trim().toLowerCase();
    const selectedType = typeSelect.value.trim();
    const selectedGenre = genreSelect.value.trim();
    let found = false;

    typeSections.forEach(section => {
      const itemType = section.getAttribute('data-type');
      const listItems = section.querySelectorAll('.list_content');
      let sectionVisible = false;

      listItems.forEach(item => {
        const itemName = item.getAttribute('data-name').toLowerCase();
        const itemGenre = item.getAttribute('data-genre');
        const matchesKeyword = !keyword || itemName.includes(keyword);
        const matchesType = !selectedType || itemType === selectedType;
        const matchesGenre = !selectedGenre || itemGenre === selectedGenre;

        if (matchesKeyword && matchesType && matchesGenre) {
          item.classList.add('visible');
          sectionVisible = true;
          found = true;
        } else {
          item.classList.remove('visible');
        }
      });

      // セクションの表示制御
      section.style.display = sectionVisible ? 'block' : 'none';
    });

    // 検索結果がない場合のメッセージ表示
    noResultMessage.style.display = found ? 'none' : 'block';
  }

  // イベントリスナーの設定
  searchButton.addEventListener('click', performSearch);

  // Enterキーで検索を実行
  searchInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      performSearch();
    }
  });

  genreSelect.addEventListener('change', performSearch);
  typeSelect.addEventListener('change', performSearch);
});
