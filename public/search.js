document.addEventListener('DOMContentLoaded', function() {
    // 검색창, 검색 결과 리스트, 추천 결과 요소 가져오기
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const menuContainer = document.getElementById('menuContainer');

    let searchQuery = ''; // 엔터를 눌렀을 때 사용할 검색어 저장

    // 검색창에 엔터 입력 감지
    searchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // 기본 엔터 동작(폼 제출 등) 방지
            searchQuery = searchInput.value.trim().toLowerCase();

            // 검색어가 있을 때 검색 실행, 없을 때 초기화면으로 돌아가기
            if (searchQuery) {
                performSearch(searchQuery);
                searchResults.innerHTML = ''; // 추천 결과를 초기화
            } else {
                displayMenus(); // 검색어가 없으면 초기 메뉴 표시
                searchResults.innerHTML = ''; // 추천 결과 초기화
            }
        } else {
            // 실시간 추천 검색어 업데이트
            updateSuggestions();
        }
    });

    // 추천어 클릭 시 동작
    function updateSuggestions() {
        const query = searchInput.value.trim().toLowerCase();

        // 저장된 메뉴 데이터를 불러옴
        const savedMenus = JSON.parse(localStorage.getItem('menus')) || [];
        const url = window.location.pathname;
        const category = url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.html'));

        // 카테고리에 맞는 메뉴 필터링
        const filteredMenus = savedMenus.filter(menu => menu.category === category);

        // 검색어와 일치하는 메뉴 필터링 (추천 리스트용)
        const matchingMenus = filteredMenus.filter(menu => menu.name.toLowerCase().includes(query));

        // 추천 결과를 화면에 표시
        searchResults.innerHTML = ''; // 이전 결과 초기화
        if (matchingMenus.length > 0 && query) {
            matchingMenus.forEach((menu) => {
                const suggestionItem = document.createElement('div');
                suggestionItem.classList.add('suggestionItem');
                suggestionItem.textContent = menu.name;

                // 추천 항목 클릭 시 해당 메뉴 상세 페이지로 이동
                suggestionItem.addEventListener('click', function() {
                    // 전체 메뉴에서 해당 메뉴의 인덱스를 정확히 찾음
                    const menuIndex = filteredMenus.indexOf(menu);
                    window.location.href = `menu-detail.html?category=${encodeURIComponent(category)}&menuIndex=${menuIndex}`;
                });

                searchResults.appendChild(suggestionItem); // 추천 결과 리스트에 추가
            });
        } else {
            searchResults.innerHTML = ''; // 검색어가 없거나 일치하는 항목이 없을 때 추천 초기화
        }
    }


    // 검색 실행 함수 (엔터 입력 시 호출됨)
    function performSearch(query) {
        const savedMenus = JSON.parse(localStorage.getItem('menus')) || [];
        const url = window.location.pathname;
        const category = url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.html'));

        // 카테고리에 맞는 메뉴 필터링
        const filteredMenus = savedMenus.filter(menu => menu.category === category);

        // 검색어와 일치하는 메뉴 필터링
        const matchingMenus = filteredMenus.filter(menu => menu.name.toLowerCase().includes(query));

        menuContainer.innerHTML = ''; // 기존 메뉴 리스트 초기화

        if (matchingMenus.length > 0) {
            matchingMenus.forEach((menu, index) => {
                // 메뉴 리스트를 다시 생성
                const menuItem = document.createElement('div');
                menuItem.classList.add('menuItem');

                const img = document.createElement('img');
                img.src = menu.image;
                menuItem.appendChild(img);

                const name = document.createElement('h3');
                name.textContent = menu.name;
                menuItem.appendChild(name);

                menuItem.addEventListener('click', function() {
                    window.location.href = `menu-detail.html?category=${encodeURIComponent(category)}&menuIndex=${index}`;
                });

                menuContainer.appendChild(menuItem);
            });
        } else {
            // 검색 결과가 없을 경우
            menuContainer.innerHTML = '<p>일치하는 메뉴가 없습니다.</p>';
        }
    }

    // 초기 메뉴 표시 함수 (검색어 없을 시 전체 메뉴 표시)
    function displayMenus() {
        const savedMenus = JSON.parse(localStorage.getItem('menus')) || [];
        const url = window.location.pathname;
        const category = url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.html'));

        const filteredMenus = savedMenus.filter(menu => menu.category === category);

        menuContainer.innerHTML = ''; // 기존 메뉴 초기화

        filteredMenus.forEach((menu, index) => {
            const menuItem = document.createElement('div');
            menuItem.classList.add('menuItem');

            const img = document.createElement('img');
            img.src = menu.image;
            menuItem.appendChild(img);

            const name = document.createElement('h3');
            name.textContent = menu.name;
            menuItem.appendChild(name);

            menuItem.addEventListener('click', function() {
                window.location.href = `menu-detail.html?category=${encodeURIComponent(category)}&menuIndex=${index}`;
            });

            menuContainer.appendChild(menuItem);
        });
    }

    // 페이지 로드 시 초기 메뉴 표시
    displayMenus();
});
