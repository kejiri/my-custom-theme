document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('search-input');
  const genreSelect = document.getElementById('genre-select');
  const searchButton = document.getElementById('search-button');
  const brandsList = document.getElementById('brands-list');
  const noResultMessage = document.getElementById('no-result');
  let brandsData = [];

  // WordPress REST APIからブランドデータを取得
  fetch('/wp-json/wp/v2/brands?per_page=100&_embed')
      .then(response => {
          if (!response.ok) throw new Error('Failed to fetch brands data from WordPress');
          return response.json();
      })
      .then(data => {
          brandsData = data.map(brand => ({
              id: brand.id,
              name: brand.title.rendered,
              genre: brand.genre || 'Uncategorized', // カスタムフィールドの「ジャンル」
              image: brand._embedded['wp:featuredmedia']?.[0]?.source_url || 'placeholder.jpg', // アイキャッチ画像
              link: brand.link
          }));
          renderBrands(brandsData); // 初期表示
      })
      .catch(error => {
          console.error('Error loading brands data:', error);
          noResultMessage.style.display = 'block';
          noResultMessage.textContent = 'Failed to load brands data. Please try again later.';
      });

  // ブランドリストをレンダリングする関数
  function renderBrands(brands) {
      brandsList.innerHTML = '';
      toggleNoResultMessage(brands.length === 0);

      brands.forEach(brand => {
          let genreSection = document.querySelector(`.genre-section[data-genre="${brand.genre}"]`);
          if (!genreSection) {
              genreSection = document.createElement('div');
              genreSection.className = 'genre-section';
              genreSection.setAttribute('data-genre', brand.genre);
              genreSection.innerHTML = `<h2 class="genre-title">${brand.genre}</h2><div class="list"></div>`;
              brandsList.appendChild(genreSection);
          }
          const list = genreSection.querySelector('.list');
          const brandElement = document.createElement('div');
          brandElement.className = 'list_content visible';
          brandElement.setAttribute('data-brandid', brand.id);
          brandElement.innerHTML = `
              <img src="${brand.image}" alt="${brand.name}">
              <h3>${brand.name}</h3>
              <a href="${brand.link}" class="brand-link" data-id="${brand.id}">View Details</a>
          `;
          list.appendChild(brandElement);
      });
  }

  function toggleNoResultMessage(show) {
      noResultMessage.style.display = show ? 'block' : 'none';
  }

  // 検索処理
  function performSearch() {
      const keyword = searchInput.value.trim().toLowerCase();
      const selectedGenre = genreSelect.value.trim();
      const filteredBrands = brandsData.filter(brand =>
          (!keyword || brand.name.toLowerCase().includes(keyword)) &&
          (!selectedGenre || brand.genre === selectedGenre)
      );
      renderBrands(filteredBrands);
  }

  // 検索イベントリスナー
  searchButton.addEventListener('click', performSearch);
  searchInput.addEventListener('keypress', e => e.key === 'Enter' && performSearch());
  genreSelect.addEventListener('change', performSearch);
});
