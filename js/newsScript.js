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

  // JSONファイルからデータを取得
  fetch('<?php echo get_template_directory_uri(); ?>/data/newsData.json')
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to fetch news data');
          }
          return response.json();
      })
      .then(data => {
          newsData = data;
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
                  <img src="<?php echo get_template_directory_uri(); ?>/${news.image}" alt="${news.title}">
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
          const matchesDate = !dateSelect.value || news.date === dateSelect.value;
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
              renderPagination(filteredNews().length);
          });

          pagination.appendChild(pageLink);
      }
  }

  function filteredNews() {
      return newsData.filter(news => {
          const matchesCategory = !categorySelect.value || news.category === categorySelect.value;
          const matchesDate = !dateSelect.value || news.date === dateSelect.value;
          const matchesKeyword = !keywordInput.value || news.title.toLowerCase().includes(keywordInput.value.toLowerCase());
          return matchesCategory && matchesDate && matchesKeyword;
      });
  }

  searchButton.addEventListener('click', () => {
      currentPage = 1;
      renderNews();
      renderPagination(filteredNews().length);
  });

  categorySelect.addEventListener('change', () => {
      currentPage = 1;
      renderNews();
      renderPagination(filteredNews().length);
  });

  dateSelect.addEventListener('change', () => {
      currentPage = 1;
      renderNews();
      renderPagination(filteredNews().length);
  });

  keywordInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
          currentPage = 1;
          renderNews();
          renderPagination(filteredNews().length);
      }
  });
});
