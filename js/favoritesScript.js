document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    const typeSelect = document.getElementById('type-select');
    const genreSelect = document.getElementById('genre-select');
    const searchButton = document.getElementById('search-button');
    const typeSections = document.querySelectorAll('.type-section');
    const noResultMessage = document.getElementById('no-result');

    // 初期表示：すべてのアイテムを表示
    typeSections.forEach(section => {
        const genreSections = section.querySelectorAll('.genre-section');
        genreSections.forEach(genreSection => {
            const items = genreSection.querySelectorAll('.list_content');
            items.forEach(item => item.classList.add('visible'));
            genreSection.classList.remove('hidden');
        });
        section.classList.remove('hidden');
    });

    // 検索処理
    function performSearch() {
        const keyword = searchInput.value.trim().toLowerCase();
        const selectedType = typeSelect.value.trim();
        const selectedGenre = genreSelect.value.trim();
        let found = false;

        typeSections.forEach(section => {
            const itemType = section.getAttribute('data-type');
            const genreSections = section.querySelectorAll('.genre-section');
            let sectionVisible = false;

            genreSections.forEach(genreSection => {
                const itemGenre = genreSection.getAttribute('data-genre');
                const items = genreSection.querySelectorAll('.list_content');
                let genreVisible = false;

                items.forEach(item => {
                    const itemName = item.getAttribute('data-name').toLowerCase();
                    const matchesKeyword = !keyword || itemName.includes(keyword);
                    const matchesType = !selectedType || itemType === selectedType;
                    const matchesGenre = !selectedGenre || itemGenre === selectedGenre;

                    if (matchesKeyword && matchesType && matchesGenre) {
                        item.classList.add('visible');
                        genreVisible = true;
                        sectionVisible = true;
                        found = true;
                    } else {
                        item.classList.remove('visible');
                    }
                });

                // ジャンル全体を非表示にするか決定
                if (genreVisible) {
                    genreSection.classList.remove('hidden');
                } else {
                    genreSection.classList.add('hidden');
                }
            });

            // タイプタイトルとセクション全体の非表示に対応
            const typeTitle = section.querySelector('.type-title');
            if (sectionVisible) {
                section.classList.remove('hidden');
                if (typeTitle) typeTitle.style.display = 'block'; // タイトルを表示
            } else {
                section.classList.add('hidden');
                if (typeTitle) typeTitle.style.display = 'none'; // タイトルを非表示
            }
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

    genreSelect.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });

    typeSelect.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
});
