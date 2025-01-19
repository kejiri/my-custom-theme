document.addEventListener('DOMContentLoaded', () => {
  let itemsData = [];
  let brandsData = {};

  // WooCommerceとWordPress REST APIからデータを取得
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
      const brands = await brandsResponse.json();

      // ブランドデータを初期化
      brands.forEach(brand => {
        brandsData[brand.id] = {
          name: brand.title.rendered,
          sales: 0,
          image: brand._embedded['wp:featuredmedia']?.[0]?.source_url || 'placeholder.jpg',
          link: brand.link
        };
      });

      // ブランドごとの売上を集計
      itemsData.forEach(item => {
        const brandId = item.categories[0]?.id || null; // WooCommerce商品に関連付けられたカテゴリをブランドとして扱う例
        if (brandsData[brandId]) {
          brandsData[brandId].sales += item.total_sales || 0; // WooCommerceの商品売上
        }
      });

      // ランキングを表示
      renderRankings();
    })
    .catch(error => console.error('Error fetching data:', error));

  // ランキングを表示
  function renderRankings() {
    renderOverallItemsRanking();
    renderGenreItemsRanking('Genre 1', document.getElementById('items-genre1-ranking'));
    renderGenreItemsRanking('Genre 2', document.getElementById('items-genre2-ranking'));
    renderOverallBrandsRanking();
  }

  // 全体のアイテムランキングを表示
  function renderOverallItemsRanking() {
    const container = document.getElementById('items-overall-ranking');
    const sortedItems = [...itemsData].sort((a, b) => b.total_sales - a.total_sales); // WooCommerceの`total_sales`を使用
    container.innerHTML = renderItemsHTML(sortedItems);
  }

  // ジャンル別アイテムランキングを表示
  function renderGenreItemsRanking(genre, container) {
    const filteredItems = itemsData.filter(item => item.categories.some(cat => cat.name === genre));
    const sortedItems = filteredItems.sort((a, b) => b.total_sales - a.total_sales);
    container.innerHTML = renderItemsHTML(sortedItems);
  }

  // 全体のブランドランキングを表示
  function renderOverallBrandsRanking() {
    const container = document.getElementById('brands-overall-ranking');
    const sortedBrands = Object.values(brandsData).sort((a, b) => b.sales - a.sales);
    container.innerHTML = renderBrandsHTML(sortedBrands);
  }

  // アイテムのHTMLを生成
  function renderItemsHTML(items) {
    return items.map(item => `
      <div class="result-item">
        <img src="${item.images[0]?.src || 'placeholder.jpg'}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>Brand: ${item.categories[0]?.name || 'Unknown'}</p>
        <p>Sales: ${item.total_sales || 0}</p>
        <a href="${item.permalink}">View Details</a>
      </div>
    `).join('');
  }

  // ブランドのHTMLを生成
  function renderBrandsHTML(brands) {
    return brands.map(brand => `
      <div class="result-item">
        <img src="${brand.image}" alt="${brand.name}">
        <h3>${brand.name}</h3>
        <p>Sales: ${brand.sales}</p>
        <a href="${brand.link}">View Details</a>
      </div>
    `).join('');
  }
});
