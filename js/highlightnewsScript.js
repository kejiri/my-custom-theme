document.addEventListener('DOMContentLoaded', function () {
  const highlightContainer = document.getElementById('highlight');

  // Highlight Newsデータを取得
  fetch('<?php echo get_template_directory_uri(); ?>/data/highlightnewsData.json')
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to fetch highlight news');
          }
          return response.json();
      })
      .then(highlight => {
          renderHighlight(highlight);
      })
      .catch(error => console.error('Error loading highlight news:', error));

  // ハイライトニュースをレンダリングする関数
  function renderHighlight(news) {
      const templateDirectory = '<?php echo get_template_directory_uri(); ?>';

      highlightContainer.innerHTML = `
          <img src="${templateDirectory}/${news.image}" alt="${news.title}">
          <div class="highlight-content">
              <h3>${news.title}</h3>
              <p>Date: ${news.date}</p>
              <p>${news.description}</p>
              <a href="${news.link}">Read more</a>
              <div class="social-share">
                  <a href="https://www.instagram.com/" target="_blank">
                      <img src="${templateDirectory}/img/icons/instagram-icon.png" alt="Instagram">Instagram
                  </a>
                  <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(news.title)}&url=${encodeURIComponent(news.link)}" target="_blank">
                      <img src="${templateDirectory}/img/icons/x-icon.png" alt="X">X
                  </a>
                  <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(news.link)}" target="_blank">
                      <img src="${templateDirectory}/img/icons/facebook-icon.png" alt="Facebook">Facebook
                  </a>
                  <a href="sms:?&body=${encodeURIComponent(news.title + ' ' + news.link)}" target="_blank">
                      <img src="${templateDirectory}/img/icons/sms-icon.png" alt="SMS">Message
                  </a>
              </div>
          </div>
      `;
  }
});
