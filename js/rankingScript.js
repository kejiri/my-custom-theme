document.addEventListener('DOMContentLoaded', () => {
  let itemsData = [];
  let brandsData = {};

  // Fetch Items and Brands Data
  Promise.all([
      fetch('<?php echo get_template_directory_uri(); ?>/data/itemsData.json').then(response => {
          if (!response.ok) throw new Error('Failed to fetch items data');
          return response.json();
      }),
      fetch('<?php echo get_template_directory_uri(); ?>/data/brandsData.json').then(response => {
          if (!response.ok) throw new Error('Failed to fetch brands data');
          return response.json();
      })
  ])
  .then(([items, brands]) => {
      itemsData = items;

      // Initialize brandsData with brand details
      brands.forEach(brand => {
          brandsData[brand.brandID] = {
              name: brand.name,
              sales: 0,
              image: '<?php echo get_template_directory_uri(); ?>/' + brand.image,
              link: brand.link
          };
      });

      // Aggregate brand sales based on items data
      itemsData.forEach(item => {
          if (brandsData[item.brandID]) {
              brandsData[item.brandID].sales += item.sales;
          }
      });

      // Render Rankings
      renderRankings();
  })
  .catch(error => console.error('Error fetching data:', error));

  // Render Rankings
  function renderRankings() {
      renderOverallItemsRanking();
      renderGenreItemsRanking("Genre 1", document.getElementById('items-genre1-ranking'));
      renderGenreItemsRanking("Genre 2", document.getElementById('items-genre2-ranking'));
      renderOverallBrandsRanking();
  }

  // Render Overall Items Ranking
  function renderOverallItemsRanking() {
      const container = document.getElementById('items-overall-ranking');
      const sortedItems = [...itemsData].sort((a, b) => b.sales - a.sales);
      container.innerHTML = renderItemsHTML(sortedItems);
  }

  // Render Items Ranking by Genre
  function renderGenreItemsRanking(genre, container) {
      const filteredItems = itemsData.filter(item => item.genre === genre);
      const sortedItems = filteredItems.sort((a, b) => b.sales - a.sales);
      container.innerHTML = renderItemsHTML(sortedItems);
  }

  // Render Overall Brands Ranking
  function renderOverallBrandsRanking() {
      const container = document.getElementById('brands-overall-ranking');
      const sortedBrands = Object.values(brandsData).sort((a, b) => b.sales - a.sales);
      container.innerHTML = renderBrandsHTML(sortedBrands);
  }

  // Generate HTML for Items
  function renderItemsHTML(items) {
      return items.map(item => `
          <div class="result-item">
              <img src="<?php echo get_template_directory_uri(); ?>/${item.image}" alt="${item.name}">
              <h3>${item.name}</h3>
              <p>Brand: ${brandsData[item.brandID]?.name || 'Unknown'}</p>
              <p>Sales: ${item.sales}</p>
              <a href="${item.link}">View Details</a>
          </div>
      `).join('');
  }

  // Generate HTML for Brands
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
