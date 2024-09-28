document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const menuIndex = parseInt(urlParams.get('menuIndex'), 10);  // 문자열을 정수로 변환
    const category = urlParams.get('category');

    const savedMenus = JSON.parse(localStorage.getItem('menus')) || [];
    const categoryMenus = savedMenus.filter(menu => menu.category === category);

    // 메뉴가 존재하는지 확인
    if (categoryMenus[menuIndex]) {
        const menu = categoryMenus[menuIndex];

        // 조회수 1 증가
        menu.views = (menu.views || 0) + 1;

        // 업데이트된 메뉴 데이터를 다시 저장
        savedMenus.forEach((m, i) => {
            if (m.category === category && categoryMenus.indexOf(m) === menuIndex) {
                savedMenus[i] = menu;
            }
        });
        localStorage.setItem('menus', JSON.stringify(savedMenus));

        // HTML 요소에 메뉴 정보 반영
        document.getElementById('menuName').textContent = menu.name;
        document.getElementById('menuImage').src = menu.image;
        document.getElementById('menuDescription').textContent = menu.description;
        document.getElementById('menuViews').textContent = `조회수: ${menu.views}`;  // 조회수 표시

        // 재료 목록 표시
        const ingredientsList = document.getElementById('menuIngredients');
        ingredientsList.innerHTML = ''; // 기존 목록 초기화
        if (menu.ingredients && Array.isArray(menu.ingredients) && menu.ingredients.length > 0) {
            menu.ingredients.forEach(ingredient => {
                const listItem = document.createElement('li');
                listItem.textContent = ingredient;
                ingredientsList.appendChild(listItem);
            });
        } else {
            ingredientsList.innerHTML = '<li>재료 정보가 없습니다.</li>';
        }

        // 레시피 표시
        const recipeParagraph = document.getElementById('menuRecipe');
        if (menu.recipe) {
            recipeParagraph.textContent = menu.recipe;
        } else {
            recipeParagraph.textContent = '레시피 정보가 없습니다.';
        }

        // 뒤로가기 버튼을 카테고리 페이지로 연결
        document.getElementById('backBtn').addEventListener('click', function() {
            window.location.href = `${category}.html`;
        });

        // 삭제 버튼 동작
        document.getElementById('deleteMenuBtn').addEventListener('click', function() {
            if (confirm('정말로 이 메뉴를 삭제하시겠습니까?')) {
                // 메뉴 삭제
                const menuToDelete = menu;
                const indexInSaved = savedMenus.findIndex(m => 
                    m.name === menuToDelete.name &&
                    m.description === menuToDelete.description &&
                    m.category === menuToDelete.category &&
                    m.createdAt === menuToDelete.createdAt
                );

                if (indexInSaved !== -1) {
                    savedMenus.splice(indexInSaved, 1);
                    localStorage.setItem('menus', JSON.stringify(savedMenus));
                    alert('메뉴가 삭제되었습니다.');
                    window.location.href = `${category}.html`;
                } else {
                    alert('메뉴를 찾을 수 없습니다.');
                }
            }
        });
    } else {
        alert('해당 메뉴를 찾을 수 없습니다.');
        window.location.href = `${category}.html`;
    }
});
