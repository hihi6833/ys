// refrigerator.js

document.addEventListener('DOMContentLoaded', function() {
    // DOM 요소 가져오기
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');
    const menuContainer = document.getElementById('menuContainer');

    // 초기 화면 로드 시 아무것도 표시하지 않음
    menuContainer.innerHTML = '';
    searchResults.innerHTML = '';

    // 검색 버튼 클릭 이벤트 리스너 추가
    searchButton.addEventListener('click', function() {
        const input = searchInput.value.trim();

        // 입력이 공백일 경우 아무것도 표시하지 않음
        if (input === '') {
            menuContainer.innerHTML = '';
            searchResults.innerHTML = '';
            return;
        }

        // 입력된 재료를 콤마로 구분하여 배열로 변환
        const inputIngredients = input.split(',')
            .map(ingredient => ingredient.trim().toLowerCase()) // 각 재료의 공백 제거 및 소문자 변환
            .filter(ingredient => ingredient !== ''); // 빈 문자열 제거

        if (inputIngredients.length === 0) {
            menuContainer.innerHTML = '';
            searchResults.innerHTML = '';
            return;
        }

        // 로컬 스토리지에서 저장된 메뉴 불러오기
        const savedMenus = JSON.parse(localStorage.getItem('menus')) || [];

        // 입력된 재료를 하나라도 포함하는 메뉴 필터링 (OR 조건)
        const matchingMenus = savedMenus.filter(menu => {
            if (!menu.ingredients || !Array.isArray(menu.ingredients)) {
                return false; // 재료 정보가 없거나 배열이 아닐 경우 제외
            }

            // 메뉴의 재료 중 하나라도 입력된 재료에 포함되어 있는지 확인
            return menu.ingredients.some(ing => inputIngredients.includes(ing.toLowerCase()));
        });

        // 검색 결과 표시
        displayMenus(matchingMenus, savedMenus);

        // 검색 결과 메시지 표시
        if (matchingMenus.length === 0) {
            searchResults.innerHTML = '<p>입력한 재료로 만들 수 있는 메뉴가 없습니다.</p>';
        } else {
            searchResults.innerHTML = `<p>${matchingMenus.length}개의 레시피를 찾았습니다.</p>`;
        }
    });

    // 메뉴를 화면에 표시하는 함수
    function displayMenus(menus, savedMenus) {
        menuContainer.innerHTML = ''; // 기존 메뉴 초기화

        if (menus.length === 0) {
            menuContainer.innerHTML = '<p>표시할 메뉴가 없습니다.</p>';
            return;
        }

        menus.forEach(menu => {
            const menuItem = document.createElement('div');
            menuItem.classList.add('menuItem');

            // 메뉴 이미지
            const img = document.createElement('img');
            img.src = menu.image;
            img.alt = menu.name;
            menuItem.appendChild(img);

            // 메뉴 이름
            const name = document.createElement('h3');
            name.textContent = menu.name;
            menuItem.appendChild(name);

            // 메뉴 설명
            const description = document.createElement('p');
            description.textContent = menu.description;
            menuItem.appendChild(description);

            // 메뉴 클릭 시 상세 페이지로 이동
            menuItem.addEventListener('click', function() {
                const category = encodeURIComponent(menu.category);
                // 해당 카테고리의 모든 메뉴 필터링
                const categoryMenus = savedMenus.filter(m => m.category === menu.category);
                // 현재 메뉴가 categoryMenus에서 몇 번째 인덱스인지 찾기
                const menuIndex = categoryMenus.findIndex(m => 
                    m.name === menu.name &&
                    m.description === menu.description &&
                    m.createdAt === menu.createdAt
                );

                if (menuIndex !== -1) {
                    window.location.href = `menu-detail.html?category=${category}&menuIndex=${menuIndex}`;
                } else {
                    alert('메뉴를 찾을 수 없습니다.');
                }
            });

            menuContainer.appendChild(menuItem);
        });
    }
});
