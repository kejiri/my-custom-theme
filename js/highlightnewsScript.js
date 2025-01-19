document.addEventListener('DOMContentLoaded', function () {
  const highlightContainer = document.getElementById('highlight');

  // WordPress REST APIからハイライトニュースを取得
  fetch('/wp-json/wp/v2/posts?per_page=1&_embed&categories=highlight') // カテゴリ名を`highlight`に設定
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to fetch highlight news');
          }
          return response.json();
      })
      .then(data => {
          if (data.length > 0) {
              renderHighlight(data[0]); // 最初の投稿を表示
          } else {
              highlightContainer.innerHTML = '<p>No highlight news available.</p>';
          }
      })
      .catch(error => {
          console.error('Error loading highlight news:', error);
          highlightContainer.innerHTML = '<p>Failed to load highlight news. Please try again later.</p>';
      });

  // ハイライトニュースをレンダリングする関数
  function renderHighlight(news) {
      const imageUrl = news._embedded['wp:featuredmedia']?.[0]?.source_url || 'placeholder.jpg'; // アイキャッチ画像
      const title = news.title.rendered;
      const date = new Date(news.date).toISOString().split('T')[0]; // YYYY-MM-DD形式
      const description = news.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, ''); // HTMLタグを削除
      const link = news.link;

      highlightContainer.innerHTML = `
          <img src="${imageUrl}" alt="${title}">
          <div class="highlight-content">
              <h3>${title}</h3>
              <p>Date: ${date}</p>
              <p>${description}</p>
              <a href="${link}">Read more</a>
              <div class="social-share">
                  <a href="https://www.instagram.com/" target="_blank">
                      <img src="/wp-content/themes/your-theme/img/icons/instagram-icon.png" alt="Instagram">Instagram
                  </a>
                  <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(link)}" target="_blank">
                      <img src="/wp-content/themes/your-theme/img/icons/x-icon.png" alt="X">X
                  </a>
                  <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}" target="_blank">
                      <img src="/wp-content/themes/your-theme/img/icons/facebook-icon.png" alt="Facebook">Facebook
                  </a>
                  <a href="sms:?&body=${encodeURIComponent(title + ' ' + link)}" target="_blank">
                      <img src="/wp-content/themes/your-theme/img/icons/sms-icon.png" alt="SMS">Message
                  </a>
              </div>
          </div>
      `;
  }
});
