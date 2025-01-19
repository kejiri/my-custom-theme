document.addEventListener('DOMContentLoaded', function () {
  const categorySelect = document.getElementById('category-select');
  const dateSelect = document.getElementById('date-select');
  const keywordInput = document.getElementById('keyword-input');
  const searchButton = document.getElementById('search-button');
  const newsList = document.getElementById('news-list');
  const noResult = document.getElementById('no-result');
  const pagination = document.getElementById('pagination');

  const itemsPerPage = 2;
  let currentPage = 1;
  let newsData = [];

  // WordPress REST APIからニュースデータを取得
  fetch('/wp-json/wp/v2/posts?per_page=100&_embed')
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to fetch news data from WordPress');
          }
          return response.json();
      })
      .then(data => {
          newsData = data.map(post => ({
              id: post.id,
              title: post.title.rendered,
              date: new Date(post.date).toISOString().split('T')[0], // YYYY-MM-DD形式に変換
              category: post.categories[0] || 'Uncategorized', // カテゴリID（カテゴリ名に変換する場合は追加処理が必要）
              image: post._embedded['wp:featuredmedia']?.[0]?.source_url || 'placeholder.jpg', // アイキャッチ画像
              description: post.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, ''), // HTMLタグを削除
              link: post.link
          }));
          renderNews();
          renderPagination(newsData.length);
      })
      .catch(error => console.error('Error loading news data:', error));

  // ニュースをレンダリングする関数
  function renderNews() {
      newsList.innerHTML = '';
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const filteredNews = filterNews();

      if (filteredNews.length === 0) {
          noResult.style.display = 'block';
          pagination.style.display = 'none';
      } else {
          noResult.style.display = 'none';
          pagination.style.display = 'flex';
          filteredNews.slice(start, end).forEach(news => {
              const newsItem = document.createElement('div');
              newsItem.className = 'news-item';
              newsItem.innerHTML = `
                  <img src="${news.image}" alt="${news.title}">
                  <div class="news-item-content">
                      <h3>${news.title}</h3>
                      <p>Date: ${news.date}</p>
                      <p>${news.description}</p>
                      <a href="${news.link}">Read more</a>
                  </div>
              `;
              newsList.appendChild(newsItem);
          });
      }
  }

  function filterNews() {
      return newsData.filter(news => {
          const matchesCategory = !categorySelect.value || news.category === categorySelect.value;
          const matchesDate = !dateSelect.value || news.date.startsWith(dateSelect.value);
          const matchesKeyword = !keywordInput.value || news.title.toLowerCase().includes(keywordInput.value.toLowerCase());
          return matchesCategory && matchesDate && matchesKeyword;
      });
  }

  function renderPagination(totalItems) {
      pagination.innerHTML = '';
      const totalPages = Math.ceil(totalItems / itemsPerPage);

      for (let i = 1; i <= totalPages; i++) {
          const pageLink = document.createElement('a');
          pageLink.href = '#';
          pageLink.textContent = i;

          // 現在のページを強調
          if (i === currentPage) {
              pageLink.classList.add('current');
          } else {
              pageLink.classList.remove('current');
          }

          pageLink.addEventListener('click', (e) => {
              e.preventDefault();
              currentPage = i;
              renderNews();
              renderPagination(filterNews().length);
          });

          pagination.appendChild(pageLink);
      }
  }

  searchButton.addEventListener('click', () => {
      currentPage = 1;
      renderNews();
      renderPagination(filterNews().length);
  });

  categorySelect.addEventListener('change', () => {
      currentPage = 1;
      renderNews();
      renderPagination(filterNews().length);
  });

  dateSelect.addEventListener('change', () => {
      currentPage = 1;
      renderNews();
      renderPagination(filterNews().length);
  });

  keywordInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
          currentPage = 1;
          renderNews();
          renderPagination(filterNews().length);
      }
  });
});
