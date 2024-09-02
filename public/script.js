document.addEventListener('DOMContentLoaded', function() {
    const url = window.location.pathname;
    const category = url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.html'));

    // localStorage에서 메뉴 데이터를 불러옵니다.
    const savedMenus = JSON.parse(localStorage.getItem('menus')) || [];
    const menuContainer = document.getElementById('menuContainer');

    // 페이지 로드 시 해당 카테고리의 모든 메뉴를 렌더링합니다.
    let filteredMenus = savedMenus.filter(menu => menu.category === category);

    // 메뉴를 렌더링하는 함수입니다.
    const renderMenus = (menus) => {
        console.log('Rendering menus:', menus);  // 렌더링할 메뉴들을 출력합니다.
        menuContainer.innerHTML = '';  // 기존 메뉴를 모두 지웁니다.

        if (menus.length === 0) {
            const noResult = document.createElement('p');
            noResult.textContent = '검색 결과가 없습니다.';
            menuContainer.appendChild(noResult);
        }

        menus.forEach((menu) => {
            const menuItem = document.createElement('div');
            menuItem.classList.add('menuItem');

            const img = document.createElement('img');
            img.src = menu.image;
            menuItem.appendChild(img);

            const name = document.createElement('h3');
            name.textContent = menu.name;
            menuItem.appendChild(name);

            const description = document.createElement('p');
            description.textContent = menu.description;
            menuItem.appendChild(description);

            console.log('Appending menu item:', menuItem);  // 메뉴 항목을 로그로 출력
            menuContainer.appendChild(menuItem);
        });
    };

    // 초기 메뉴 렌더링
    renderMenus(filteredMenus);

    // 검색 입력란을 감지하여 입력된 검색어에 맞는 메뉴만 표시합니다.
    const searchInput = document.querySelector('.text-wrapper-20');  // class를 사용하여 선택

    // 검색을 수행하는 함수
    const performSearch = () => {
        const query = searchInput.value.toLowerCase();  // 입력된 검색어를 소문자로 변환합니다.
        console.log('Performing search with query:', query);  // 검색어 확인 로그
        const searchedMenus = filteredMenus.filter(menu => 
            menu.name.toLowerCase().includes(query) || 
            menu.description.toLowerCase().includes(query)
        );
        console.log('Searched menus:', searchedMenus);  // 필터링된 메뉴들을 출력합니다.
        renderMenus(searchedMenus);  // 필터링된 메뉴를 다시 렌더링합니다.
    };

    // 엔터 키 검색 기능
    searchInput.addEventListener('keydown', function(event) {
        console.log('Key pressed:', event.key);  // 키 입력 로그
        if (event.key === 'Enter') {
            event.preventDefault();  // 엔터키로 폼 제출이 발생하지 않도록 기본 동작을 막습니다.
            performSearch();  // 엔터 키를 눌렀을 때 검색 수행
        }
    });

    // 검색 버튼 클릭 기능 (검색 버튼이 HTML에 추가되어야 합니다)
    const searchButton = document.getElementById('searchButton');
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }
});

const savedMenus = JSON.parse(localStorage.getItem('menus')) || [];
console.log('Saved menus:', savedMenus);



