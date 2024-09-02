document.addEventListener('DOMContentLoaded', function() {
    const url = window.location.pathname;
    const category = url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.html'));

    // localStorage에서 메뉴 데이터를 불러옵니다.
    const savedMenus = JSON.parse(localStorage.getItem('menus')) || [];
    const menuContainer = document.getElementById('menuContainer');

    // 특정 카테고리의 메뉴를 렌더링하는 함수입니다.
    const renderMenus = (menus) => {
        menuContainer.innerHTML = '';  // 기존 메뉴를 모두 지웁니다.
        menus.forEach((menu, index) => {
            if(menu.category === category) {  // 해당 카테고리의 메뉴만 표시합니다.
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

                menuItem.addEventListener('click', function() {
                    window.location.href = `menu-detail.html?category=${category}&menuIndex=${index}`;
                });

                menuContainer.appendChild(menuItem);
            }
        });
    };

    // 페이지가 로드될 때 해당 카테고리의 모든 메뉴를 렌더링합니다.
    const filteredMenus = savedMenus.filter(menu => menu.category === category);
    renderMenus(filteredMenus);

    // 검색 입력란을 감지하여 입력된 검색어에 맞는 메뉴만 표시합니다.
    const searchInput = document.querySelector('.text-wrapper-20');  // class를 사용하여 선택
    searchInput.addEventListener('input', function() {
        const query = searchInput.value.toLowerCase();  // 입력된 검색어를 소문자로 변환합니다.
        const searchedMenus = filteredMenus.filter(menu => 
            menu.name.toLowerCase().includes(query) || 
            menu.description.toLowerCase().includes(query)
        );
        renderMenus(searchedMenus);  // 필터링된 메뉴를 다시 렌더링합니다.
    });
});
