document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const menuIndex = parseInt(urlParams.get('menuIndex'), 10);  // 문자열을 정수로 변환
    const category = urlParams.get('category');

    // 서버에서 메뉴 데이터 가져오기
    fetch('https://recipeople-8b0228b8c755.herokuapp.com/menus')
        .then(response => response.json())
        .then(data => {
            const categoryMenus = data.filter(menu => menu.category === category);

            // 메뉴가 존재하는지 확인
            if (categoryMenus[menuIndex]) {
                const menu = categoryMenus[menuIndex];

                // 조회수 1 증가
                menu.views = (menu.views || 0) + 1;

                // 업데이트된 조회수를 서버에 저장
                fetch(`https://recipeople-8b0228b8c755.herokuapp.com/menus/${menu.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(menu),
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('조회수 업데이트에 실패했습니다.');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('조회수 업데이트 성공:', data);
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('조회수 업데이트 중 오류가 발생했습니다.');
                });

                // HTML 요소에 메뉴 정보 반영
                document.getElementById('menuName').textContent = menu.name;
                document.getElementById('menuImage').src = menu.image;
                document.getElementById('menuDescription').textContent = menu.description;
                document.getElementById('menuViews').textContent = `조회수: ${menu.views}`;

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
                document.getElementById('backBtn').addEventListener('click', function () {
                    history.back();
                });

                // 삭제 버튼 동작
                document.getElementById('deleteMenuBtn').addEventListener('click', function () {
                    if (confirm('정말로 이 메뉴를 삭제하시겠습니까?')) {
                        // 메뉴 삭제 요청
                        fetch(`https://recipeople-8b0228b8c755.herokuapp.com/menus/${menu.id}`, {
                            method: 'DELETE',
                        })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('메뉴 삭제에 실패했습니다.');
                            }
                            alert('메뉴가 삭제되었습니다.');
                            window.location.href = `${category}.html`;
                        })
                        .catch(error => {
                            console.error('Error:', error);
                            alert('메뉴 삭제 중 오류가 발생했습니다.');
                        });
                    }
                });
            } else {
                alert('해당 메뉴를 찾을 수 없습니다.');
                window.location.href = `${category}.html`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('메뉴 데이터를 불러오는 중 오류가 발생했습니다.');
            window.location.href = `${category}.html`;
        });
});
